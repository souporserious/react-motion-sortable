(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactMotion"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactMotion"], factory);
	else if(typeof exports === 'object')
		exports["Sortable"] = factory(require("React"), require("ReactMotion"));
	else
		root["Sortable"] = factory(root["React"], root["ReactMotion"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _sortable = __webpack_require__(1);

	var _sortable2 = _interopRequireDefault(_sortable);

	exports['default'] = _sortable2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMotion = __webpack_require__(3);

	var _reinsert = __webpack_require__(4);

	var _reinsert2 = _interopRequireDefault(_reinsert);

	var _clamp = __webpack_require__(5);

	var _clamp2 = _interopRequireDefault(_clamp);

	var Sortable = (function (_Component) {
	  function Sortable() {
	    var _this = this;

	    _classCallCheck(this, Sortable);

	    _get(Object.getPrototypeOf(Sortable.prototype), 'constructor', this).apply(this, arguments);

	    this.state = {
	      delta: 0,
	      mouse: 0,
	      order: this.props.children
	    };
	    this._isPressed = false;
	    this._lastPressed = 0;
	    this._itemsCount = this.props.children.length;

	    this._getEndValues = function (currValues) {
	      var _props = _this.props;
	      var children = _props.children;
	      var springConfig = _props.springConfig;
	      var _state = _this.state;
	      var mouse = _state.mouse;
	      var order = _state.order;

	      var configs = {};

	      _react.Children.forEach(children, function (child) {
	        if (!child) return;
	        var shadow = undefined,
	            y = undefined;

	        if (_this._lastPressed === child && _this._isPressed) {
	          shadow = { val: 16, config: springConfig };
	          y = { val: mouse, config: [] };
	        } else {
	          shadow = { val: 1, config: springConfig };
	          y = { val: order.indexOf(child) * 100, config: springConfig };
	        }

	        configs[child.key] = {
	          component: child,
	          shadow: shadow, y: y
	        };
	      });
	      return configs;
	    };
	  }

	  _inherits(Sortable, _Component);

	  _createClass(Sortable, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('touchmove', this._dragMove.bind(this));
	      window.addEventListener('touchend', this._dragEnd.bind(this));
	      window.addEventListener('mousemove', this._dragMove.bind(this));
	      window.addEventListener('mouseup', this._dragEnd.bind(this));
	    }
	  }, {
	    key: '_dragStart',
	    value: function _dragStart(child, pressY, e) {
	      var _ref = e.touches && e.touches[0] || e;

	      var pageY = _ref.pageY;

	      this._isPressed = true;
	      this._lastPressed = child;

	      this.setState({
	        delta: pageY - pressY,
	        mouse: pressY
	      });
	    }
	  }, {
	    key: '_dragMove',
	    value: function _dragMove(_ref2) {
	      var pageY = _ref2.pageY;
	      var _state2 = this.state;
	      var delta = _state2.delta;
	      var order = _state2.order;

	      if (this._isPressed) {
	        var mouse = pageY - delta;
	        var row = (0, _clamp2['default'])(Math.round(mouse / 100), 0, this._itemsCount - 1);
	        var newOrder = (0, _reinsert2['default'])(order, order.indexOf(this._lastPressed), row);
	        this.setState({ mouse: mouse, order: newOrder });
	      }
	    }
	  }, {
	    key: '_dragEnd',
	    value: function _dragEnd() {
	      var order = this.state.order;

	      this._isPressed = false;
	      this.props.onChange(order);
	      this.setState({ delta: 0 });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var order = this.state.order;

	      var childrenToRender = function childrenToRender(children) {
	        return Object.keys(children).map(function (key, n) {
	          var child = children[key];
	          var component = child.component;
	          var shadow = child.shadow;
	          var y = child.y;

	          return (0, _react.cloneElement)(component, {
	            onMouseDown: _this2._dragStart.bind(_this2, component, y.val),
	            onTouchStart: _this2._dragStart.bind(_this2, component, y.val),
	            style: {
	              boxShadow: 'rgba(0, 0, 0, 0.2) 0px ' + shadow.val + 'px ' + 2 * shadow.val + 'px 0px',
	              transform: 'translate3d(0, ' + y.val + 'px, 0)',
	              zIndex: component === _this2._lastPressed ? 99 : n
	            }
	          });
	        });
	      };

	      return _react2['default'].createElement(
	        _reactMotion.Spring,
	        { endValue: this._getEndValues },
	        function (children) {
	          return (0, _react.createElement)(_this2.props.component, { className: _this2.props.className }, childrenToRender(children));
	        }
	      );
	    }
	  }], [{
	    key: 'defaultProps',
	    value: {
	      component: 'ul',
	      springConfig: [300, 50],
	      onChange: function onChange() {
	        return null;
	      }
	    },
	    enumerable: true
	  }]);

	  return Sortable;
	})(_react.Component);

	exports['default'] = Sortable;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = reinsert;

	function reinsert(arr, from, to) {
	  if (arr === undefined) arr = arr.slice(0);
	  return (function () {
	    var _arr = arr.slice(0);
	    var val = _arr[from];
	    _arr.splice(from, 1);
	    _arr.splice(to, 0, val);
	    return _arr;
	  })();
	}

	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = clamp;

	function clamp(n, min, max) {
	  return Math.max(Math.min(n, max), min);
	}

	module.exports = exports["default"];

/***/ }
/******/ ])
});
;