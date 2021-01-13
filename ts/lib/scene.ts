import * as BABYLON from "babylonjs";

import PageData from "./page_data";
import TileServer from "./mapbox";

export default class EarthCubeScene extends BABYLON.Scene {
  private camera: BABYLON.ArcRotateCamera;
  private light: BABYLON.HemisphericLight;

  constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(engine);

    const box = BABYLON.MeshBuilder.CreateBox("Box", {
      size: 4,
      faceUV: new UVRow(6),
    }, this);
    box.material = new EarthCubeMaterial(this);

    this.camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), this);
    this.camera.attachControl(canvas, true);

    this.light = new BABYLON.HemisphericLight("Sun", new BABYLON.Vector3(1, 1, 0), this);
  }
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
