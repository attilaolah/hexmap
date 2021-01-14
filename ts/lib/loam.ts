import * as loam from "../../node_modules/loam/lib/loam.js";

const PREFETCH: Array<string> = Array
  .from(document.querySelectorAll("link[rel=prefetch]"))
  .map((link: HTMLLinkElement): string => link.href);

const prefetched = (file: string): string => PREFETCH
  .filter(path => path.match(new RegExp(`/${file}$`)))
  .shift();

const prefetchedJS = `
  "use strict";
  const PREFETCH = ${JSON.stringify(PREFETCH)};
  Module.locateFile = ${prefetched.toString()};
`

export default function InitLoam(): Promise<loam> {
  return new Promise(resolve => {
    fetch(prefetched("loam-worker.js"))
      .then(res => res.blob())
      .then(blob => blob.text())
      .then(text => {
        loam.initialize(`${URL.createObjectURL(new Blob([
          // Prevent the worker from trying to load 'gdal.js'.
          // Instead, tell it to load from a prefetched blob resourse.
          // Also inject Module.locateFile that locates files based on prefetched links.
          text.replace(
            /\bimportScripts\(["']gdal.js["']\)/g,
            `importScripts("${
              // Load a script that will populate Module.locateFile().
              URL.createObjectURL(new Blob([prefetchedJS]))
            }", "${
              // Now load the actual gdal.js, but from a blob.
              //URL.createObjectURL(gdal)
              prefetched("gdal.js")
            }")`)]))}#`)
          .then(() => resolve(loam));
      });
  });
}
