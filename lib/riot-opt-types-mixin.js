/******/ (function(modules) { // webpackBootstrap
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

	exports.default = {
	    init: function init() {
	        var tagName = this.opts.dataIs;

	        if (!this.optTypes) {
	            console.error('optTypes object was not set in the tag "' + tagName + '" and is expected when using riot-opt-types-mixin');
	        }

	        if (this.defaultOptTypes) {
	            this.opts = Object.assign({}, this.opts, this.defaultOptTypes);
	        }

	        var prevOpts = void 0;

	        this.on('updated', function updated() {
	            if (prevOpts && JSON.stringify(prevOpts) === JSON.stringify(this.opts)) {
	                return;
	            }

	            prevOpts = Object.assign({}, this.opts);

	            for (var key in this.optTypes) {
	                var error = this.optTypes[key](this.opts, key, tagName);

	                if (error) {
	                    console.error(error);
	                }
	            }
	        });
	    }
	};


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

	function createPrimitiveTypeChecker(expectedType) {

	    console.log('create');
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

	var optTypes = exports.optTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    oneOf: createOneOfTypeChecker,
	    shape: createShapeTypeChecker,
	    string: createPrimitiveTypeChecker('string')
	};

/***/ }
/******/ ]);