import * as BABYLON from 'babylonjs';

export default function CreateScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
  const scene = new BABYLON.Scene(engine);  

  BABYLON.MeshBuilder.CreatePolyhedron("oct", {
    type: 3,
  }, scene);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

  return scene;
}
