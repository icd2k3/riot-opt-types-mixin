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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ReactPropTypes = __webpack_require__(1);

	var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	function err(error) {

	    /* istanbul ignore next */
	    if (!isTestEnv) {
	        console.error(error);
	    }
	    if (errors && errors.length) {
	        errors.push(error.toString());
	    } else {
	        errors = [error.toString()];
	    }
	}

	// riotjs mixin
	exports.default = {
	    init: function init() {
	        var _this = this;

	        var tagName = this.opts.dataIs,
	            validateOpts = function validateOpts() {
	            errors = null;

	            // lightly compare prevOpts to current opts to determine if we need to re-validate. This is pretty fast, but will only work if opts are in the same order
	            if (prevOpts && JSON.stringify(prevOpts) === JSON.stringify(_this.opts)) {
	                return;
	            }

	            // store prevOpts for the next time this tag is updated
	            prevOpts = Object.assign({}, _this.opts);

	            // check if the tag has any opts that are NOT defined in optTypes
	            for (var key in _this.opts) {
	                if (!_this.optTypes.hasOwnProperty(key) && key !== 'dataIs' && key !== 'optTypes' && key !== 'riotTag') {
	                    err(new Error('opt \'' + key + '\' was not defined in <' + tagName + '>\'s optTypes config.'));
	                }
	            }

	            // validate all passed opts
	            for (var _key in _this.optTypes) {
	                if (_this.optTypes.hasOwnProperty(_key)) {
	                    var error = _this.optTypes[_key](_this.opts, _key, tagName);

	                    if (error) {
	                        err(error);
	                    }
	                }
	            }
	        };

	        // if mixin was instantiated, but optTypes was not provided, we need to display console error
	        if (!this.optTypes) {
	            err(new Error('optTypes object was not set in the tag <' + tagName + '> ' + 'and is expected when using the mixin riot-opt-types-mixin.'));
	        }

	        // validate all opts of the tag on mount and updated
	        if (this.optTypes) {
	            validateOpts();
	            this.on('updated', validateOpts);
	        }

	        // clear errors and prevOpts when tag unmounts
	        this.on('unmount', function () {
	            errors = null;
	            prevOpts = null;
	        });
	    },
	    getRiotOptTypesMixinErrors: function getRiotOptTypesMixinErrors() {

	        /* istanbul ignore next */
	        if (!isTestEnv) {
	            console.warn('The getRiotOptTypesMixinErrors function is only intended to be used for testing purposes');
	        }
	        return errors;
	    }
	};


	module.exports.optTypes = _ReactPropTypes2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */

	'use strict';

	/* var ReactElement = require('./ReactElement'); was removed by riot-opt-types-mixin webpack config */
	/* var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames'); was removed by riot-opt-types-mixin webpack config */

	var emptyFunction = __webpack_require__(2);
	/* var getIteratorFn = require('./getIteratorFnt'); was removed by riot-opt-types-mixin webpack config */

	/**
	 * Collection of methods that allow declaration and validation of opts that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     optTypes: {
	 *       // An optional string opt named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum opt named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A opt named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    optTypes: {
	 *      // An optional string or URI opt named "href".
	 *      href: function(opts, optName, componentName) {
	 *        var optValue = opts[optName];
	 *        if (optValue != null && typeof optValue !== 'string' &&
	 *            !(optValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + optName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),
	  symbol: createPrimitiveTypeChecker('symbol'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  /* element: createElementTypeChecker was removed by riot-opt-types-mixin webpack config */
	  instanceOf: createInstanceTypeChecker,
	  /* node: createNodeChecker was removed by riot-opt-types-mixin webpack config */
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, opts, optName, componentName, location, optFullName) {
	    componentName = componentName || ANONYMOUS;
	    optFullName = optFullName || optName;
	    if (opts[optName] == null) {
	      var locationName = 'opt' /* ReactPropTypeLocationNames[location] was replaced by 'opt' in riot-opt-types-mixin webpack config */;
	      if (isRequired) {
	        return new Error('Required ' + locationName + ' `' + optFullName + '` was not specified in ' + ('`' + componentName + '`.'));
	      }
	      return null;
	    } else {
	      return validate(opts, optName, componentName, location, optFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(opts, optName, componentName, location, optFullName) {
	    var optValue = opts[optName];
	    var optType = getPropType(optValue);
	    if (optType !== expectedType) {
	      var locationName = 'opt' /* ReactPropTypeLocationNames[location] was replaced by 'opt' in riot-opt-types-mixin webpack config */;
	      // `optValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(optValue);

	      return new Error('Invalid ' + locationName + ' `' + optFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(opts, optName, componentName, location, optFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + optFullName + '` of component `' + componentName + '` has invalid optType notation inside arrayOf.');
	    }
	    var optValue = opts[optName];
	    if (!Array.isArray(optValue)) {
	      var locationName = 'opt' /* ReactPropTypeLocationNames[location] was replaced by 'opt' in riot-opt-types-mixin webpack config */;
	      var optType = getPropType(optValue);
	      return new Error('Invalid ' + locationName + ' `' + optFullName + '` of type ' + ('`' + optType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < optValue.length; i++) {
	      var error = typeChecker(optValue, i, componentName, location, optFullName + '[' + i + ']');
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	/* function createElementTypeChecker was removed by riot-opt-types-mixin webpack config */

	function createInstanceTypeChecker(expectedClass) {
	  function validate(opts, optName, componentName, location, optFullName) {
	    if (!(opts[optName] instanceof expectedClass)) {
	      var locationName = 'opt' /* ReactPropTypeLocationNames[location] was replaced by 'opt' in riot-opt-types-mixin webpack config */;
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(opts[optName]);
	      return new Error('Invalid ' + locationName + ' `' + optFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
	    });
	  }

	  function validate(opts, optName, componentName, location, optFullName) {
	    var optValue = opts[optName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(optValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = 'opt' /* ReactPropTypeLocationNames[location] was replaced by 'opt' in riot-opt-types-mixin webpack config */;
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error('Invalid ' + locationName + ' `' + optFullName + '` of value `' + optValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(opts, optName, componentName, location, optFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + optFullName + '` of component `' + componentName + '` has invalid optType notation inside objectOf.');
	    }
	    var optValue = opts[optName];
	    var optType = getPropType(optValue);
	    if (optType !== 'object') {
	      var locationName = 'opt' /* ReactPropTypeLocationNames[location] was replaced by 'opt' in riot-opt-types-mixin webpack config */;
	      return new Error('Invalid ' + locationName + ' `' + optFullName + '` of type ' + ('`' + optType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in optValue) {
	      if (optValue.hasOwnProperty(key)) {
	        var error = typeChecker(optValue, key, componentName, location, optFullName + '.' + key);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
	    });
	  }

	  function validate(opts, optName, componentName, location, optFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(opts, optName, componentName, location, optFullName) == null) {
	        return null;
	      }
	    }

	    var locationName = 'opt' /* ReactPropTypeLocationNames[location] was replaced by 'opt' in riot-opt-types-mixin webpack config */;
	    return new Error('Invalid ' + locationName + ' `' + optFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	/* function createNodeChecker() was removed by riot-opt-types-mixin webpack config */

	function createShapeTypeChecker(shapeTypes) {
	  function validate(opts, optName, componentName, location, optFullName) {
	    var optValue = opts[optName];
	    var optType = getPropType(optValue);
	    if (optType !== 'object') {
	      var locationName = 'opt' /* ReactPropTypeLocationNames[location] was replaced by 'opt' in riot-opt-types-mixin webpack config */;
	      return new Error('Invalid ' + locationName + ' `' + optFullName + '` of type `' + optType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(optValue, key, componentName, location, optFullName + '.' + key);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	/* function isNode(optValue) was removed by riot-opt-types-mixin webpack config */

	function isSymbol(optType, optValue) {
	  // Native Symbol.
	  if (optType === 'symbol') {
	    return true;
	  }

	  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	  if (optValue['@@toStringTag'] === 'Symbol') {
	    return true;
	  }

	  // Fallback for non-spec compliant Symbols which are polyfilled.
	  if (typeof Symbol === 'function' && optValue instanceof Symbol) {
	    return true;
	  }

	  return false;
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(optValue) {
	  var optType = typeof optValue;
	  if (Array.isArray(optValue)) {
	    return 'array';
	  }
	  if (optValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  if (isSymbol(optType, optValue)) {
	    return 'symbol';
	  }
	  return optType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(optValue) {
	  var optType = getPropType(optValue);
	  if (optType === 'object') {
	    if (optValue instanceof Date) {
	      return 'date';
	    } else if (optValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return optType;
	}

	// Returns class name of the object, if any.
	function getClassName(optValue) {
	  if (!optValue.constructor || !optValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return optValue.constructor.name;
	}

	module.exports = ReactPropTypes;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }
/******/ ])
});
;