/*!
 * ohu-share v0.1.0
 * author jeffwcx
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ohu"] = factory();
	else
		root["ohu"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Browsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Apps; });
const Browsers = {
  QQBROWSER: 0,
  UC: 1,
  BAIDUBROWSER: 2,
  QQ: 3,
  WECHAT: 4
};

const Apps = {
  WECHAT: 0,
  MOMENTS: 1,
  QQ: 2,
  QZONE: 3,
  WEIBO: 4,
  ALIPAY: 5
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__share__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Share", function() { return __WEBPACK_IMPORTED_MODULE_0__share__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Browsers", function() { return __WEBPACK_IMPORTED_MODULE_1__constants__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Apps", function() { return __WEBPACK_IMPORTED_MODULE_1__constants__["a"]; });



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ohu_detect__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context__ = __webpack_require__(8);



/**
 * import { Share, Browsers, Apps } from 'ohu-share'
 * 
 * const share = new Share({
 *   title: 'title',
 *   summary: 'summary',
 *   img: 'img'
 *   link: 'link'
 * }, {
 *   from: [Browsers.QQBROWSER, Browser.UC, Browser.QQ, Browsers.WECHAT, Browsers.BAIDUBROWSER]
 *   to: [Apps.WECHAT, Apps.MOMENTS, Apps.QQ, Apps.QZONE, Apps.WEIBO, Apps.ALIPAY]
 * })
 * 
 * share.mount({
 *   Apps.WECHAT: '#wechat',
 *   Apps.MOMENTS: '#moments',
 *   Apps.QQ: '#qq',
 *   Apps.QZONE: '#qzone',
 *   Apps.WEIBO: '#weibo',
 *   Apps.ALIPAY: '#alipay'
 * })
 */

class Share {
  constructor(shareInfo, config) {
    const browserInfo = new __WEBPACK_IMPORTED_MODULE_0_ohu_detect__["a" /* default */](navigator.userAgent);
    this.context = new __WEBPACK_IMPORTED_MODULE_1__context__["a" /* default */](shareInfo, config, browserInfo);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Share;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_os__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_browserEngines__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_browsers__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getDetector__ = __webpack_require__(7);





const Detector = Object(__WEBPACK_IMPORTED_MODULE_3__getDetector__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__data_os__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__data_browsers__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__data_browserEngines__["a" /* default */])

/* harmony default export */ __webpack_exports__["a"] = (Detector);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function version (str) {
  return str.replace(/_/g, '.')
}

function device (str) {
  return str.toLowerCase()
}

/* harmony default export */ __webpack_exports__["a"] = ([
  {
    name: 'os x',
    match: '\\((\\w+);.*mac os x ([0-9_\\.]+)',
    order: ['device', 'version'],
    process: {
      version,
      device
    }
  },
  {
    name: 'ios',
    match: '\\((\\w+)(?:;|\\s).*os ([0-9_\\.]+) like mac os x',
    order: ['device', 'version'],
    process: {
      version,
      device
    }
  },
  {
    name: 'linux',
    match: 'linux',
    post: [
      {
        name: 'android',
        match: 'android ([0-9.]+)',
        order: ['version']
      }
    ]
  },
  {
    name: 'windows',
    match: 'windows nt ([0-9.]+)',
    order: ['version'],
    process: {
      version (str) {
        if (str === '5.1' || str === '5.2') {
          return 'xp'
        } else if (str === '6.0') {
          return 'vista'
        } else if (str === '6.1') {
          return '7'
        } else if (str === '6.2' || str === '6.3') {
          return '8'
        } else if (str === '6.4' || str === '10.0') {
          return '10'
        }
        return 'nt' + str
      }
    }
  }
]);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([
  {
    name: 'trident',
    match: 'trident\\/([0-9.]+)',
    order: ['version']
  },
  {
    name: 'gecko',
    match: 'gecko\\/(\\d+)',
    order: ['version']
  },
  {
    name: 'webkit',
    match: 'webkit\\/([0-9.]+)',
    order: ['version']
  },
  {
    name: 'presto',
    match: 'presto\\/([0-9.]+)',
    order: ['version']
  }
]);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ([
  {
    name: 'chrome',
    match: 'chrome\\/([0-9.]+)',
    order: ['version'],
    pre: [
      {
        name: 'edge',
        match: 'edge\\/([0-9.]+)',
        order: ['version']
      },
      {
        name: 'opera',
        match: 'opr\\/([0-9.]+)',
        order: ['version']
      }
    ]
  },
  {
    name: 'firefox',
    match: 'firefox\\/([0-9.]+)',
    order: ['version']
  },
  {
    name: 'safari',
    match: 'version\\/([0-9.]+).*safari',
    order: ['version']
  },
  {
    name: 'ie',
    match: 'msie\\s([0-9.]+)',
    order: ['version'],
    pre: [
      // ie11 special
      {
        name: 'ie',
        match: 'rv:(11.0)',
        order: ['version']
      }
    ]
  },
  {
    name: 'opera',
    match: 'opera\\/([0-9.]+)',
    order: ['version']
  }
]);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getDetector;
/**
 * get detector according to different data
 */

function getDetector (os, browsers, browserEngines) {
  return class Detector {
    constructor (ua) {
      this.ua = ua
      this._detectOS()
      this._detectBrowser()
      this._detectBrowserEngine()
    }
    _match (data, result) {
      data.some((item) => {
        if (item.pre) {
          this._match(item.pre, result)
          if (result.name) return true
        }
        const mg = this.ua.match(new RegExp(item.match, 'i'))
        if (mg !== null) {
          result.name = item.name
          if (item.order) {
            for (let i = 0, j = 1; i < item.order.length; i += 1, j += 1) {
              const matchName = item.order[i]
              let matchResult = mg[j]
              if (item.process && item.process[matchName]) {
                matchResult = item.process[matchName](matchResult)
              }
              result[matchName] = matchResult
            }
          }
          if (item.post) {
            this._match(item.post, result)
          }
          return true
        }
        return false
      })
    }
    _detectOS () {
      this.os = {}
      this._match(os, this.os)
    }
    _detectBrowserEngine () {
      this.browserEngine = {}
      this._match(browserEngines, this.browserEngine)
    }
    _detectBrowser () {
      this.browser = {}
      this._match(browsers, this.browser)
    }
  }
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);

const defaultShareInfo = {
  title: document.title,
  summary: '',
  img: '',
  link: window.location.href
};

const defaultConfig = {
  from: [],
  to: []
};

class Context {
  constructor(shareInfo, config, browserInfo) {
    this.shareInfo = Object.assign(shareInfo || {}, defaultShareInfo);
    this.config = Object.assign(defaultConfig || {}, defaultConfig);
    this.browserInfo = browserInfo;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Context;


/***/ })
/******/ ]);
});
//# sourceMappingURL=ohu-share.js.map