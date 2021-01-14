/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/loam/lib/loam.js":
/*!***************************************!*\
  !*** ./node_modules/loam/lib/loam.js ***!
  \***************************************/
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_576__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_576__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_576__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_576__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__nested_webpack_require_576__.d = function(exports, name, getter) {
/******/ 		if(!__nested_webpack_require_576__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nested_webpack_require_576__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__nested_webpack_require_576__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__nested_webpack_require_576__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_576__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_576__(__nested_webpack_require_576__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = randomKey;

// https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
function randomKey() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0123456789abcdefghijklmnopqrstuvwxyz';
  var result = '';

  for (var i = length; i > 0; i--) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

module.exports = exports.default;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __nested_webpack_require_3562__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWorker = initWorker;
exports.accessFromDataset = accessFromDataset;
exports.runOnWorker = runOnWorker;

var _randomKey = _interopRequireDefault(__nested_webpack_require_3562__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var messages = {};
var workerPromise; // Cache the currently executing script at initialization so that we can use it later to figure
// out where all the other scripts should be pulled from

var _scripts = document.getElementsByTagName('script');

var THIS_SCRIPT = _scripts[_scripts.length - 1]; // Inspired by Emscripten's method for doing the same thing

function getPathPrefix() {
  return THIS_SCRIPT.src.substring(0, THIS_SCRIPT.src.lastIndexOf('/')) + '/';
} // Set up a WebWorker and an associated promise that resolves once it's ready


function initWorker(pathPrefix) {
  pathPrefix = pathPrefix || getPathPrefix();

  if (typeof workerPromise === 'undefined') {
    workerPromise = new Promise(function (resolve, reject) {
      var _worker = new Worker(pathPrefix + 'loam-worker.js'); // The worker needs to do some initialization, and will send a message when it's ready.


      _worker.onmessage = function (msg) {
        if (msg.data.ready) {
          // Once the worker's ready, change the onMessage function to execute and clear
          // the stored promise resolvers.
          _worker.onmessage = function (msg) {
            // Execute stored promise resolver by message ID
            // Promise resolvers are stored by callWorker().
            if (msg.data.success) {
              messages[msg.data.id][0](msg.data.result);
            } else {
              messages[msg.data.id][1](new Error(msg.data.message));
            }

            delete messages[msg.data.id];
          };

          resolve(_worker);
        } else if (msg.data.error) {
          reject(msg.data.error);
        }
      };
    });
  }

  return workerPromise;
} // Store a listener function with a key so that we can associate it with a message later.


function addMessageResolver(callback, errback) {
  var key = (0, _randomKey["default"])();

  while (messages.hasOwnProperty(key)) {
    key = (0, _randomKey["default"])();
  }

  messages[key] = [callback, errback];
  return key;
} // Send a message to the worker and return a promise that resolves / rejects when a message with
// a matching id is returned.


function workerTaskPromise(options) {
  return initWorker().then(function (worker) {
    return new Promise(function (resolve, reject) {
      var resolverId = addMessageResolver(function (workerResult) {
        return resolve(workerResult);
      }, function (reason) {
        return reject(reason);
      });
      worker.postMessage(_objectSpread({
        id: resolverId
      }, options));
    });
  });
} // Accessors is a list of accessors operations to run on the dataset defined by dataset.


function accessFromDataset(accessor, dataset) {
  return workerTaskPromise({
    accessor: accessor,
    dataset: dataset
  });
} // Run a single function on the worker.


function runOnWorker(func, args) {
  return workerTaskPromise({
    func: func,
    args: args
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __nested_webpack_require_7980__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GDALDataset = exports.DatasetOperation = void 0;

var _workerCommunication = __nested_webpack_require_7980__(3);

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// A function, to be executed within the GDAL webworker context, that outputs a dataset.
var DatasetOperation = function DatasetOperation(functionName, args) {
  _classCallCheck(this, DatasetOperation);

  this.func = functionName;
  this.args = args;
};

exports.DatasetOperation = DatasetOperation;

var GDALDataset =
/*#__PURE__*/
function () {
  function GDALDataset(source, operations) {
    _classCallCheck(this, GDALDataset);

    this.source = source;

    if (operations && operations.length > 0) {
      this.operations = operations;
    } else {
      this.operations = [];
    }
  } // Does "nothing", but triggers the dataset to be opened and immediately closed with GDAL, which
  // will fail if the file is not a recognized format.


  _createClass(GDALDataset, [{
    key: "open",
    value: function open() {
      return (0, _workerCommunication.accessFromDataset)(undefined, this);
    }
  }, {
    key: "bytes",
    value: function bytes() {
      return (0, _workerCommunication.accessFromDataset)('LoamReadBytes', this);
    }
  }, {
    key: "count",
    value: function count() {
      return (0, _workerCommunication.accessFromDataset)('GDALGetRasterCount', this);
    }
  }, {
    key: "width",
    value: function width() {
      return (0, _workerCommunication.accessFromDataset)('GDALGetRasterXSize', this);
    }
  }, {
    key: "height",
    value: function height() {
      return (0, _workerCommunication.accessFromDataset)('GDALGetRasterYSize', this);
    }
  }, {
    key: "wkt",
    value: function wkt() {
      return (0, _workerCommunication.accessFromDataset)('GDALGetProjectionRef', this);
    }
  }, {
    key: "transform",
    value: function transform() {
      return (0, _workerCommunication.accessFromDataset)('GDALGetGeoTransform', this);
    }
  }, {
    key: "convert",
    value: function convert(args) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        resolve(new GDALDataset(_this.source, _this.operations.concat(new DatasetOperation('GDALTranslate', args))));
      });
    }
  }, {
    key: "warp",
    value: function warp(args) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        resolve(new GDALDataset(_this2.source, _this2.operations.concat(new DatasetOperation('GDALWarp', args))));
      });
    }
  }, {
    key: "render",
    value: function render(mode, args, colors) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        // DEMProcessing requires an auxiliary color definition file in some cases, so the API
        // can't be easily represented as an array of strings. This packs the user-friendly
        // interface of render() into an array that the worker communication machinery can
        // easily make use of. It'll get unpacked inside the worker. Yet another reason to use
        // something like comlink (#49)
        var cliOrderArgs = [mode, colors].concat(args);
        resolve(new GDALDataset(_this3.source, _this3.operations.concat(new DatasetOperation('GDALDEMProcessing', cliOrderArgs))));
      });
    }
  }, {
    key: "close",
    value: function close() {
      return new Promise(function (resolve, reject) {
        var warningMsg = 'It is not necessary to call close() on a Loam dataset. This is a no-op';
        console.warn(warningMsg);
        resolve([]);
      });
    }
  }]);

  return GDALDataset;
}();

exports.GDALDataset = GDALDataset;

/***/ }),
/* 5 */
/***/ (function(module, exports, __nested_webpack_require_12397__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = __nested_webpack_require_12397__(6);

var _gdalDataset = __nested_webpack_require_12397__(4);

var _default = {
  open: _api.open,
  rasterize: _api.rasterize,
  GDALDataset: _gdalDataset.GDALDataset,
  initialize: _api.initialize,
  reproject: _api.reproject
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __nested_webpack_require_12897__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.open = open;
exports.rasterize = rasterize;
exports.initialize = initialize;
exports.reproject = reproject;

var _workerCommunication = __nested_webpack_require_12897__(3);

var _gdalDataset = __nested_webpack_require_12897__(4);

function open(file) {
  return new Promise(function (resolve, reject) {
    var ds = new _gdalDataset.GDALDataset({
      func: 'GDALOpen',
      src: file,
      args: []
    });
    return ds.open().then(function () {
      return resolve(ds);
    }, function (reason) {
      return reject(reason);
    });
  });
}

function rasterize(geojson, args) {
  return new Promise(function (resolve, reject) {
    resolve(new _gdalDataset.GDALDataset({
      func: 'GDALRasterize',
      src: geojson,
      args: args
    }));
  });
}

function reproject(fromCRS, toCRS, coords) {
  var xCoords = new Float64Array(coords.map(function (pair) {
    return pair[0];
  }));
  var yCoords = new Float64Array(coords.map(function (pair) {
    return pair[1];
  }));
  return (0, _workerCommunication.runOnWorker)('LoamReproject', [fromCRS, toCRS, xCoords, yCoords]);
}

function initialize(pathPrefix) {
  return (0, _workerCommunication.initWorker)(pathPrefix);
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=loam.js.map

/***/ }),

/***/ "./ts/index.ts":
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/scene */ "./ts/lib/scene.ts");


const canvas = document.getElementById("render");
const engine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Engine(canvas, true);
const scene = new _lib_scene__WEBPACK_IMPORTED_MODULE_1__.default(canvas, engine);
// Register a render loop to repeatedly render the scene:
engine.runRenderLoop(() => scene.render());
// Watch for browser/canvas resize events:
window.addEventListener("resize", () => engine.resize());


/***/ }),

/***/ "./ts/lib/loam.ts":
/*!************************!*\
  !*** ./ts/lib/loam.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ InitLoam
/* harmony export */ });
/* harmony import */ var _node_modules_loam_lib_loam_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/loam/lib/loam.js */ "./node_modules/loam/lib/loam.js");
/* harmony import */ var _node_modules_loam_lib_loam_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_loam_lib_loam_js__WEBPACK_IMPORTED_MODULE_0__);

const PREFETCH = Array
    .from(document.querySelectorAll("link[rel=prefetch]"))
    .map((link) => link.href);
const prefetched = (file) => PREFETCH
    .filter(path => path.match(new RegExp(`/${file}$`)))
    .shift();
const prefetchedJS = `
  "use strict";
  const PREFETCH = ${JSON.stringify(PREFETCH)};
  Module.locateFile = ${prefetched.toString()};
`;
function InitLoam() {
    return new Promise(resolve => {
        fetch(prefetched("loam-worker.js"))
            .then(res => res.blob())
            .then(blob => blob.text())
            .then(text => {
            _node_modules_loam_lib_loam_js__WEBPACK_IMPORTED_MODULE_0__.initialize(`${URL.createObjectURL(new Blob([
                // Prevent the worker from trying to load 'gdal.js'.
                // Instead, tell it to load from a prefetched blob resourse.
                // Also inject Module.locateFile that locates files based on prefetched links.
                text.replace(/\bimportScripts\(["']gdal.js["']\)/g, `importScripts("${
                // Load a script that will populate Module.locateFile().
                URL.createObjectURL(new Blob([prefetchedJS]))}", "${
                // Now load the actual gdal.js, but from a blob.
                //URL.createObjectURL(gdal)
                prefetched("gdal.js")}")`)
            ]))}#`)
                .then(() => resolve(_node_modules_loam_lib_loam_js__WEBPACK_IMPORTED_MODULE_0__));
        });
    });
}


/***/ }),

/***/ "./ts/lib/mapbox.ts":
/*!**************************!*\
  !*** ./ts/lib/mapbox.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ TileServer
/* harmony export */ });
/* harmony import */ var _loam__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loam */ "./ts/lib/loam.ts");

class TileServer {
    constructor(token) {
        this.endpoint = "https://api.mapbox.com/styles";
        this.version = "v1";
        this.user = "mapbox";
        this.style = "streets-v11";
        this.token = token;
        (0,_loam__WEBPACK_IMPORTED_MODULE_0__.default)()
            .then(loam => {
            console.log("LOAM initialised.");
        });
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ EarthCubeScene
/* harmony export */ });
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _page_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page_data */ "./ts/lib/page_data.ts");
/* harmony import */ var _mapbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapbox */ "./ts/lib/mapbox.ts");



class EarthCubeScene extends babylonjs__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(canvas, engine) {
        super(engine);
        const box = babylonjs__WEBPACK_IMPORTED_MODULE_0__.MeshBuilder.CreateBox("Box", {
            size: 4,
            faceUV: new UVRow(6),
        }, this);
        box.material = new EarthCubeMaterial(this);
        this.camera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0), this);
        this.camera.attachControl(canvas, true);
        this.light = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.HemisphericLight("Sun", new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 1, 0), this);
    }
}
class EarthCubeMaterial extends babylonjs__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial {
    constructor(scene) {
        super("EarthCubeMaterial", scene);
        this.diffuseTexture = new EarthCubeTexture(scene);
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
class UVRow extends Array {
    constructor(cols) {
        super(cols);
        for (let i = 0; i < cols; i++) {
            this[i] = new babylonjs__WEBPACK_IMPORTED_MODULE_0__.Vector4(i / cols, 0, (i + 1) / cols, 1);
        }
    }
}


/***/ }),

/***/ "babylonjs":
/*!**************************!*\
  !*** external "BABYLON" ***!
  \**************************/
/***/ ((module) => {

"use strict";
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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