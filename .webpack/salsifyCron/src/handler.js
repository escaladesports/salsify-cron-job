(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./models/Sheet.js":
/*!*************************!*\
  !*** ./models/Sheet.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

var mongoose = __webpack_require__(/*! mongoose */ "mongoose");
var SheetSchema = new mongoose.Schema({
  sheetId: String,
  status: String,
  url: String
});
module.exports = mongoose.model('Sheet', SheetSchema);

/***/ }),

/***/ "./src/handler.js":
/*!************************!*\
  !*** ./src/handler.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

var _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ "isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _axios = __webpack_require__(/*! axios */ "axios");

var _axios2 = _interopRequireDefault(_axios);

var _middy = __webpack_require__(/*! middy */ "middy");

var _middy2 = _interopRequireDefault(_middy);

var _middlewares = __webpack_require__(/*! middy/middlewares */ "middy/middlewares");

var _db = __webpack_require__(/*! ../utils/db */ "./utils/db.js");

var _Sheet = __webpack_require__(/*! ../models/Sheet */ "./models/Sheet.js");

var _Sheet2 = _interopRequireDefault(_Sheet);

var _config = __webpack_require__(/*! ../utils/config */ "./utils/config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! envdotjs */ "envdotjs").load();


module.exports.salsifyCron = (0, _middy2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var sheetId, options, storedData, res, resWithId;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context.callbackWaitsForEmptyEventLoop = false;
            sheetId = void 0;
            options = {
              url: 'https://app.salsify.com/api/orgs/' + process.env.SALSIFY_ORG_ID + '/export_runs',
              headers: {
                Authorization: 'Bearer ' + process.env.SALSIFY_API_KEY,
                'Content-Type': 'application/json'
              }
            };
            _context.next = 5;
            return (0, _db.connectToDatabase)();

          case 5:
            _context.next = 7;
            return _Sheet2.default.find({});

          case 7:
            storedData = _context.sent;

            if (!(storedData.length > 0 && storedData[0] && storedData[0].status === 'completed' && storedData[0].url !== null)) {
              _context.next = 13;
              break;
            }

            console.log('Trigger WebHook');
            _axios2.default.post('https://api.netlify.com/build_hooks/5afd9ca03672df1c2a63961a');
            process.exit(0);
            return _context.abrupt('return');

          case 13:
            if (storedData[0]) {
              sheetId = storedData[0].sheetId;
            }

            if (!(storedData.length === 0)) {
              _context.next = 26;
              break;
            }

            _context.next = 17;
            return (0, _isomorphicFetch2.default)(options.url, {
              method: 'POST',
              headers: options.headers,
              body: (0, _stringify2.default)(_config2.default)
            }).then(function (res) {
              return res.json();
            });

          case 17:
            res = _context.sent;

            if (!(res.id && res.status)) {
              _context.next = 24;
              break;
            }

            _context.next = 21;
            return _Sheet2.default.create({
              sheetId: res.id,
              url: null,
              status: res.status
            });

          case 21:
            sheetId = res.id;
            _context.next = 26;
            break;

          case 24:
            console.log(res);
            process.exit(1);

          case 26:
            _context.next = 28;
            return (0, _isomorphicFetch2.default)(options.url + '/' + sheetId, {
              method: 'GET',
              headers: options.headers
            }).then(function (res) {
              return res.json();
            });

          case 28:
            resWithId = _context.sent;


            if (resWithId.status === 'running') {
              console.log('running cron job');
              console.log(resWithId.estimated_time_remaining);
            }

            if (!(resWithId.status === 'completed')) {
              _context.next = 34;
              break;
            }

            console.log('completed cron job');
            _context.next = 34;
            return _Sheet2.default.findByIdAndUpdate(storedData[0], { status: resWithId.status, url: resWithId.url }, { new: true });

          case 34:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()).use((0, _middlewares.cors)()).use((0, _middlewares.jsonBodyParser)()).use((0, _middlewares.httpErrorHandler)());

/***/ }),

/***/ "./utils/config.json":
/*!***************************!*\
  !*** ./utils/config.json ***!
  \***************************/
/*! exports provided: configuration, default */
/***/ (function(module) {

module.exports = {"configuration":{"entity_type":"product","filter":"=list:default","properties":"'sku','Name','Supplier','Release Date','NEW_COLUMN_JC','Long Description'","include_all_columns":true,"product_type":"all"}};

/***/ }),

/***/ "./utils/db.js":
/*!*********************!*\
  !*** ./utils/db.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

var _envdotjs = __webpack_require__(/*! envdotjs */ "envdotjs");

var _envdotjs2 = _interopRequireDefault(_envdotjs);

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! envdotjs */ "envdotjs").load();

_mongoose2.default.Promise = global.Promise;
var isConnected = void 0;
var URI = 'mongodb://tbaustin:password@ds141406.mlab.com:41406/salsify-test-api';
var connectToDatabase = function connectToDatabase() {
  if (isConnected) {
    return _promise2.default.resolve();
  }
  return _mongoose2.default.connect(URI).then(function (db) {
    isConnected = db.connections[0].readyState;
  });
};

module.exports = {
  connectToDatabase: connectToDatabase
};

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/core-js/promise":
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "envdotjs":
/*!***************************!*\
  !*** external "envdotjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("envdotjs");

/***/ }),

/***/ "isomorphic-fetch":
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "middy":
/*!************************!*\
  !*** external "middy" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("middy");

/***/ }),

/***/ "middy/middlewares":
/*!************************************!*\
  !*** external "middy/middlewares" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("middy/middlewares");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ })));
//# sourceMappingURL=handler.js.map