import * as BABYLON from "babylonjs";

import PageData from "./page_data";
import TileServer from "./mapbox";

export default function NewScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
  const scene = new BABYLON.Scene(engine);

  const box = BABYLON.MeshBuilder.CreateBox("box", {
    size: 4,
    faceUV: new UVRow(6),
  }, scene);
  box.material = new EarthCubeMaterial(scene);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

  return scene;
}

class EarthCubeMaterial extends BABYLON.StandardMaterial {
  constructor(scene: BABYLON.Scene) {
    super("EarthCubeMaterial", scene);

    this.diffuseTexture = new EarthCubeTexture(scene);
  }
}

class EarthCubeTexture extends BABYLON.DynamicTexture {
  private ts: TileServer;

  constructor(scene: BABYLON.Scene) {
    const res = 1024;
    super("EarthCubeTexture", {
      height: res,
      width: res*6,
    }, scene, false);

    this.ts = new TileServer(PageData().mapbox_api_token);
    this.ts.getTile(0, 0, 0, true)
      .then((img) => {
        this.getContext().drawImage(img, res*0, 0);
        this.getContext().drawImage(img, res*1, 0);
        this.getContext().drawImage(img, res*2, 0);
        this.getContext().drawImage(img, res*3, 0);
        this.getContext().drawImage(img, res*4, 0);
        this.getContext().drawImage(img, res*5, 0);
        this.update(true);
      });
  }
}

class UVRow extends Array<BABYLON.Vector4> {
  constructor(cols: number) {
    super(cols);
    for (let i = 0; i < cols; i++) {
      this[i] = new BABYLON.Vector4(i/cols, 0, (i+1)/cols, 1);
    }
  }
}
