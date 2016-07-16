(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["riot-opt-types-mixin"] = factory();
	else
		root["riot-opt-types-mixin"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	* This is a slightly trimmed down port of React's PropTypes bundled as a riotjs mixin.
	*
	* Source of type checkers (React):
	*   - https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js
	*
	* Usage:
	*   import riotOptTypesMixin, { optTypes } from 'riot-opt-types-mixin';
	*   <tag>
	*       <script>
	*           this.optTypes = {
	*               name: optTypes.string.isRequired
	*           };
	*           this.mixin(riotOptTypesMixin);
	*       </script>
	*       <h1>Hello, {opts.name}</h1>
	*   </tag>
	*/

	// used for local dev tests
	var isTestEnv = window.__env && window.__env.NODE_ENV === 'test';

	// keep track of current errors and previous opts in root scope
	var prevOpts = void 0,
	    errors = void 0;

	// riotjs mixin
	exports.default = {
	    init: function init() {
	        var _this = this;

	        var tagName = this.opts.dataIs,
	            validateOpts = function validateOpts() {
	            errors = null;

	            if (prevOpts && JSON.stringify(prevOpts) === JSON.stringify(_this.opts)) {
	                return;
	            }

	            prevOpts = Object.assign({}, _this.opts);

	            for (var key in _this.optTypes) {
	                var error = _this.optTypes[key](_this.opts, key, tagName);

	                if (error) {
	                    if (!isTestEnv) {
	                        console.error(error);
	                    }

	                    if (errors && errors.length) {
	                        errors.push(error.toString());
	                    } else {
	                        errors = [error.toString()];
	                    }
	                }
	            }
	        };

	        if (!this.optTypes) {
	            console.error(new Error('optTypes object was not set in the tag <' + tagName + '> ' + 'and is expected when using the mixin riot-opt-types-mixin.'));
	        }

	        validateOpts();
	        this.on('updated', validateOpts);
	        this.on('unmount', function () {
	            errors = null;
	            prevOpts = null;
	        });
	    },
	    getRiotOptTypesMixinErrors: function getRiotOptTypesMixinErrors() {
	        if (!isTestEnv) {
	            console.warn('The getRiotOptTypesMixinErrors function is only intended to be used for testing purposes');
	        }
	        return errors;
	    },
	    getRiotOptTypesPrevOpts: function getRiotOptTypesPrevOpts() {
	        if (!isTestEnv) {
	            console.warn('The getRiotOptTypesPrevOpts function is only intended to be used for testing purposes');
	        }
	        return prevOpts;
	    }
	};

	// getOptType ported from React PropTypes source

	function getOptType(optValue) {
	    var optType = typeof optValue === 'undefined' ? 'undefined' : _typeof(optValue);

	    if (Array.isArray(optValue)) {
	        return 'array';
	    }
	    if (optValue instanceof RegExp) {
	        return 'object';
	    }
	    return optType;
	}

	// get precisce type ported from React PropTypes source
	function getPreciseType(optValue) {
	    var optType = getOptType(optValue);

	    if (optType === 'object') {
	        if (optValue instanceof Date) {
	            return 'date';
	        } else if (optValue instanceof RegExp) {
	            return 'regexp';
	        }
	    }
	    return optType;
	}

	// create chainable type checker ported from React PropTypes source
	function createChainableTypeChecker(validate) {
	    function checkType(isRequired, opts, optName, tagName) {
	        if (opts[optName] === null || opts[optName] === undefined) {
	            if (isRequired) {
	                return new Error('Required opt `' + optName + '` was not specified in ' + ('`' + tagName + '`.'));
	            }
	            return null;
	        }

	        return validate(opts, optName, tagName);
	    }

	    var chainedCheckType = checkType.bind(null, false);

	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	}

	// create primitive checker ported from React PropTypes source
	function createPrimitiveTypeChecker(expectedType) {
	    function validate(opts, optName, tagName) {
	        var optValue = opts[optName],
	            optType = getOptType(optValue);

	        if (optType !== expectedType) {
	            var preciseType = getPreciseType(optValue);

	            return new Error('Invalid opt `' + optName + '` of type ' + ('`' + preciseType + '` supplied to `' + tagName + '`, expected ') + ('`' + expectedType + '`.'));
	        }
	        return null;
	    }
	    return createChainableTypeChecker(validate);
	}

	// create shape checker ported from React PropTypes source
	function createShapeTypeChecker(shapeTypes) {
	    function validate(opts, optName, tagName) {
	        var optValue = opts[optName],
	            optType = getOptType(optValue);

	        if (optType !== 'object') {
	            return new Error('Invalid opt `' + optName + '` of type `' + optType + '` ' + ('supplied to `' + tagName + '`, expected `object`.'));
	        }

	        for (var key in shapeTypes) {
	            var checker = shapeTypes[key],
	                error = checker(optValue, key, tagName);

	            if (error) {
	                return error;
	            }
	        }
	        return null;
	    }
	    return createChainableTypeChecker(validate);
	}

	// create one of type checker ported from React PropTypes source
	function createOneOfTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	        console.error('Invalid argument supplied to oneOf, expected an instance of array.');
	    }

	    function validate(opts, optName, tagName) {
	        var optValue = opts[optName],
	            valuesString = JSON.stringify(expectedValues);

	        for (var i = 0; i < expectedValues.length; i++) {
	            if (Object.is(optValue, expectedValues[i])) {
	                return null;
	            }
	        }

	        return new Error('Invalid opt `' + optName + '` of value `' + optValue + '` ' + ('supplied to `' + tagName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	}

	// any type checker ported from React PropTypes source
	function createAnyTypeChecker() {
	    return createChainableTypeChecker(function () {
	        return null;
	    });
	}

	// array type checker ported from React PropTypes source
	function createArrayOfTypeChecker(typeChecker) {
	    function validate(opts, optName, tagName) {
	        if (typeof typeChecker !== 'function') {
	            return new Error('opt `' + optName + '` of tag `' + tagName + '` has invalid optType notation inside arrayOf.');
	        }
	        var optValue = opts[optName];

	        if (!Array.isArray(optValue)) {
	            var optType = getOptType(optValue);

	            return new Error('Invalid opt `' + optName + '` of type ' + ('`' + optType + '` supplied to `' + tagName + '`, expected an array.'));
	        }
	        for (var i = 0; i < optValue.length; i++) {
	            var error = typeChecker(optValue + ' at index ' + i, i, tagName);

	            if (error instanceof Error) {
	                return error;
	            }
	        }
	        return null;
	    }
	    return createChainableTypeChecker(validate);
	}

	// all supported optTypes - imported as a sub-module ex: import { optTypes } from 'riot-opt-types-mixin'
	module.exports.optTypes = {
	    any: createAnyTypeChecker(),
	    array: createPrimitiveTypeChecker('array'),
	    arrayOf: createArrayOfTypeChecker,
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    oneOf: createOneOfTypeChecker,
	    shape: createShapeTypeChecker,
	    string: createPrimitiveTypeChecker('string')
	};

/***/ }
/******/ ])
});
;