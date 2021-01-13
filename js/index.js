const canvas = document.getElementById("render");
const engine = new BABYLON.Engine(canvas, true);
const scene = NewScene(canvas, engine);

// Register a render loop to repeatedly render the scene:
engine.runRenderLoop(() => scene.render());

// Watch for browser/canvas resize events:
window.addEventListener("resize", () => engine.resize());

function NewScene(canvas, engine) {
  const scene = new BABYLON.Scene(engine);  

  NewIcosahedron(scene);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

  return scene;
}

function NewIcosahedron(scene) {
  return BABYLON.MeshBuilder.CreatePolyhedron("oct", {
    type: 3,
  }, scene);
}
