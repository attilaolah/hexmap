import * as BABYLON from "babylonjs";

import EarthCubeScene from "./lib/scene";

const canvas = document.getElementById("render") as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
const scene = new EarthCubeScene(canvas, engine);

// Register a render loop to repeatedly render the scene:
engine.runRenderLoop(() => scene.render());

// Watch for browser/canvas resize events:
window.addEventListener("resize", () => engine.resize());
