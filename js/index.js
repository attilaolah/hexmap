/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/index.ts":
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/scene */ "./ts/lib/scene.ts");


const canvas = document.getElementById("render");
const engine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Engine(canvas, true);
const scene = (0,_lib_scene__WEBPACK_IMPORTED_MODULE_1__.default)(canvas, engine);
// Register a render loop to repeatedly render the scene:
engine.runRenderLoop(() => scene.render());
// Watch for browser/canvas resize events:
window.addEventListener("resize", () => engine.resize());


/***/ }),

/***/ "./ts/lib/mapbox.ts":
/*!**************************!*\
  !*** ./ts/lib/mapbox.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ TileServer
/* harmony export */ });
class TileServer {
    constructor(token) {
        this.endpoint = "https://api.mapbox.com/styles";
        this.version = "v1";
        this.user = "mapbox";
        this.style = "streets-v11";
        this.token = token;
    }
    getURL(zoom, x, y, hires) {
        return `${[
            this.endpoint, this.version, this.user, this.style,
            "tiles", zoom, x, y,
        ].join("/")}${hires ? "@2x" : ""}?access_token=${this.token}`;
    }
    getTile(zoom, x, y, hires) {
        return new Promise(resolve => {
            const img = new Image();
            img.addEventListener("load", () => resolve(img));
            img.crossOrigin = "anonymous";
            img.src = this.getURL(zoom, x, y, hires);
        });
    }
}


/***/ }),

/***/ "./ts/lib/page_data.ts":
/*!*****************************!*\
  !*** ./ts/lib/page_data.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class PageData {
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return JSON.parse(document.getElementById("data").innerText);
}


/***/ }),

/***/ "./ts/lib/scene.ts":
/*!*************************!*\
  !*** ./ts/lib/scene.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ NewScene
/* harmony export */ });
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _page_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page_data */ "./ts/lib/page_data.ts");
/* harmony import */ var _mapbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapbox */ "./ts/lib/mapbox.ts");



function NewScene(canvas, engine) {
    const scene = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Scene(engine);
    const box = babylonjs__WEBPACK_IMPORTED_MODULE_0__.MeshBuilder.CreateBox("box", {
        size: 4,
        faceUV: new UVRow(6),
    }, scene);
    box.material = new EarthCubeMaterial(scene);
    const camera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    const light = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.HemisphericLight("light", new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 1, 0), scene);
    return scene;
}
class UVRow extends Array {
    constructor(cols) {
        super(cols);
        for (let i = 0; i < cols; i++) {
            this[i] = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Vector4(i / cols, 0, (i + 1) / cols, 1);
        }
    }
}
class EarthCubeTexture extends babylonjs__WEBPACK_IMPORTED_MODULE_0__.DynamicTexture {
    constructor(scene) {
        const res = 1024;
        super("EarthCubeTexture", {
            height: res,
            width: res * 6,
        }, scene, false);
        this.ts = new _mapbox__WEBPACK_IMPORTED_MODULE_2__.default((0,_page_data__WEBPACK_IMPORTED_MODULE_1__.default)().mapbox_api_token);
        this.ts.getTile(0, 0, 0, true)
            .then((img) => {
            this.getContext().drawImage(img, res * 0, 0);
            this.getContext().drawImage(img, res * 1, 0);
            this.getContext().drawImage(img, res * 2, 0);
            this.getContext().drawImage(img, res * 3, 0);
            this.getContext().drawImage(img, res * 4, 0);
            this.getContext().drawImage(img, res * 5, 0);
            this.update(true);
        });
    }
}
class EarthCubeMaterial extends babylonjs__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial {
    constructor(scene) {
        super("EarthCubeMaterial", scene);
        this.diffuseTexture = new EarthCubeTexture(scene);
    }
}


/***/ }),

/***/ "babylonjs":
/*!**************************!*\
  !*** external "BABYLON" ***!
  \**************************/
/***/ ((module) => {

module.exports = BABYLON;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./ts/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=index.js.map