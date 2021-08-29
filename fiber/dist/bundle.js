/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ \"./src/react/index.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\nvar jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"div\", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"p\", null, \"hello world\"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"p\", null, \"hi react\")); // render(jsx,document.getElementById('root'))\n\nvar Greatung = /*#__PURE__*/function (_Component) {\n  _inherits(Greatung, _Component);\n\n  var _super = _createSuper(Greatung);\n\n  function Greatung() {\n    _classCallCheck(this, Greatung);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(Greatung, [{\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"div\", null, this.props.title, \"\\u54C8\\u54C8\\u54C8\\u54C8\");\n    }\n  }]);\n\n  return Greatung;\n}(_react__WEBPACK_IMPORTED_MODULE_0__.Component);\n\n(0,_react__WEBPACK_IMPORTED_MODULE_0__.render)( /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Greatung, {\n  title: \"ceshi\"\n}), document.getElementById('root'));\n\nfunction Fncomponent(props) {\n  return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"div\", null, props.title, \"\\u51FD\\u6570\\u7EC4\\u4EF6\");\n} // render(<Fncomponent title=\"厕所\" />,document.getElementById('root'))\n\n//# sourceURL=webpack://fiber/./src/index.js?");

/***/ }),

/***/ "./src/react/component.js":
/*!********************************!*\
  !*** ./src/react/component.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Component = function Component(props) {\n  _classCallCheck(this, Component);\n\n  this.props = props;\n};\n\n//# sourceURL=webpack://fiber/./src/react/component.js?");

/***/ }),

/***/ "./src/react/createElement.js":
/*!************************************!*\
  !*** ./src/react/createElement.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createElement)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction createElement(type, props) {\n  var _ref;\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  var childredElements = (_ref = []).concat.apply(_ref, children);\n\n  childredElements = childredElements.reduce(function (result, child) {\n    if (typeof child !== 'boolean' && child !== null) {\n      if (_typeof(child) === 'object') {\n        result.push(child);\n      } else {\n        result.push(createElement('text', {\n          textContent: child\n        }));\n      }\n    }\n\n    return result;\n  }, []);\n  return {\n    type: type,\n    props: Object.assign({\n      children: childredElements\n    }, props),\n    children: childredElements\n  };\n}\n\n//# sourceURL=webpack://fiber/./src/react/createElement.js?");

/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _render__WEBPACK_IMPORTED_MODULE_1__.render),\n/* harmony export */   \"Component\": () => (/* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_2__.Component),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./src/react/createElement.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/react/render.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ \"./src/react/component.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.default\n});\n\n//# sourceURL=webpack://fiber/./src/react/index.js?");

/***/ }),

/***/ "./src/react/micn/creatReactInstance.js":
/*!**********************************************!*\
  !*** ./src/react/micn/creatReactInstance.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ creatReactInstance)\n/* harmony export */ });\nfunction creatReactInstance(fiber) {\n  var instance = null;\n\n  if (fiber.tag === 'class_component') {\n    instance = new fiber.type(fiber.props);\n  } else {\n    instance = fiber.type;\n  }\n\n  return instance;\n}\n\n//# sourceURL=webpack://fiber/./src/react/micn/creatReactInstance.js?");

/***/ }),

/***/ "./src/react/micn/createDOMElement.js":
/*!********************************************!*\
  !*** ./src/react/micn/createDOMElement.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createDOMElement)\n/* harmony export */ });\n/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateNodeElement */ \"./src/react/micn/updateNodeElement.js\");\n\nfunction createDOMElement(virtualDOM) {\n  var element = null;\n\n  if (virtualDOM.type === 'text') {\n    element = document.createTextNode(virtualDOM.props.textContent);\n  } else {\n    element = document.createElement(virtualDOM.type);\n    (0,_updateNodeElement__WEBPACK_IMPORTED_MODULE_0__.default)(element, virtualDOM);\n  }\n\n  return element;\n}\n\n//# sourceURL=webpack://fiber/./src/react/micn/createDOMElement.js?");

/***/ }),

/***/ "./src/react/micn/index.js":
/*!*********************************!*\
  !*** ./src/react/micn/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskSqueen\": () => (/* binding */ taskSqueen),\n/* harmony export */   \"arrified\": () => (/* binding */ arrified),\n/* harmony export */   \"createStateNode\": () => (/* binding */ createStateNode),\n/* harmony export */   \"getTag\": () => (/* binding */ getTag)\n/* harmony export */ });\n/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ \"./src/react/micn/createDOMElement.js\");\n/* harmony import */ var _creatReactInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./creatReactInstance */ \"./src/react/micn/creatReactInstance.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component */ \"./src/react/component.js\");\n\n\n\nfunction taskSqueen() {\n  var task = [];\n  return {\n    push: function push(item) {\n      return task.push(item);\n    },\n    pop: function pop() {\n      return task.shift();\n    },\n    isEmpty: function isEmpty() {\n      return task.length === 0;\n    }\n  };\n}\nfunction arrified(arg) {\n  return Array.isArray(arg) ? arg : [arg];\n}\nfunction createStateNode(fiber) {\n  if (fiber.tag === \"host_component\") {\n    return (0,_createDOMElement__WEBPACK_IMPORTED_MODULE_0__.default)(fiber);\n  } else {\n    return (0,_creatReactInstance__WEBPACK_IMPORTED_MODULE_1__.default)(fiber);\n  }\n}\nfunction getTag(element) {\n  if (typeof element.type === 'string') {\n    return 'host_component';\n  }\n\n  if (Object.getPrototypeOf(element.type) === _component__WEBPACK_IMPORTED_MODULE_2__.Component) {\n    return 'class_component';\n  }\n\n  return 'function_component';\n}\n\n//# sourceURL=webpack://fiber/./src/react/micn/index.js?");

/***/ }),

/***/ "./src/react/micn/updateNodeElement.js":
/*!*********************************************!*\
  !*** ./src/react/micn/updateNodeElement.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateNodeElement)\n/* harmony export */ });\nfunction updateNodeElement(element, virtualDOM) {\n  var oldVirtualDom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var props = virtualDOM.props || {};\n  var oldProps = oldVirtualDom.props || {};\n\n  for (var k in props) {\n    if (props[k] !== oldProps[k]) {\n      if (k.slice(0, 2) === 'on') {\n        // 注册事件\n        var type = k.toLowerCase().slice(2);\n        element.addEventListener(type, props[k]); // 如果之前有事件，则移除\n\n        if (oldProps[k]) {\n          element.removeEventListener(type, oldProps[k]);\n        }\n      } else if (k === 'value' || k === 'checked') {\n        element[k] = props[k];\n      } else if (k !== 'children') {\n        if (k === 'className') {\n          element.setAttribute('class', props[k]);\n        } else {\n          element.setAttribute(k, props[k]);\n        }\n      }\n    }\n  } // 如果有删除的属性，在这里处理\n\n\n  for (var _k in oldProps) {\n    if (!props[_k]) {\n      if (_k.slice(0, 2) === 'on') {\n        var _type = _k.toLowerCase().slice(2);\n\n        element.removeEventListener(_type, oldProps[_k]);\n      } else if (_k !== 'children') {\n        if (_k === 'className') {\n          element.removeAttribute('class');\n        } else {\n          element.removeAttribute(_k);\n        }\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://fiber/./src/react/micn/updateNodeElement.js?");

/***/ }),

/***/ "./src/react/render.js":
/*!*****************************!*\
  !*** ./src/react/render.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _micn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./micn */ \"./src/react/micn/index.js\");\n\nvar taskSqueens = (0,_micn__WEBPACK_IMPORTED_MODULE_0__.taskSqueen)(); // 定义自任务对象，实际就是一个fiber对象\n\nvar subTask = null;\nvar pendingCommit = null;\n\nvar commitAllWork = function commitAllWork(fiber) {\n  console.log(fiber);\n  fiber.effects.forEach(function (item) {\n    if (item.effectTags === \"placement\") {\n      var parentFiber = item.parent;\n\n      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {\n        parentFiber = parentFiber.parent;\n      }\n\n      if (item.tag === 'host_component') {\n        parentFiber.stateNode.appendChild(item.stateNode);\n      }\n    }\n  }); // 备份旧的fiber对象\n\n  fiber.stateNode.__rootFiberContainer = fiber;\n};\n\nvar getFirstTask = function getFirstTask() {\n  // 从任务队列中获取任务\n  var task = taskSqueens.pop(); // 返回最外层节点的fiber对象\n\n  return {\n    props: task.props,\n    stateNode: task.dom,\n    tag: \"host_root\",\n    effects: [],\n    child: null,\n    alternate: task.dom.__rootFiberContainer\n  };\n};\n\nvar reconcileChildren = function reconcileChildren(fiber, children) {\n  // children可能是对象也可能是数组\n  // children是数组，则直接返回\n  // children是对象，要将对象变成数组\n  var childrenFiber = (0,_micn__WEBPACK_IMPORTED_MODULE_0__.arrified)(children);\n  var index = 0;\n  var childrenFiberlength = childrenFiber.length;\n  var element = null;\n  var newFiber = null;\n  var proveFiber = null;\n\n  while (index < childrenFiberlength) {\n    element = childrenFiber[index];\n    newFiber = {\n      type: element.type,\n      props: element.props,\n      tag: (0,_micn__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),\n      effects: [],\n      effectTags: 'placement',\n      parent: fiber\n    }; // 为fiber节点创建stateNode属性\n\n    newFiber.stateNode = (0,_micn__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);\n\n    if (index === 0) {\n      // index为0时\n      // 为fiber添加子节点（第一个子节点）\n      fiber.child = newFiber;\n    } else {\n      // index不为0时，\n      // 为子节点添加下一个兄弟节点\n      proveFiber.sibling = newFiber;\n    }\n\n    proveFiber = newFiber;\n    index++;\n  }\n};\n\nvar executeTask = function executeTask(fiber) {\n  // 构建子节点fiber对象\n  if (fiber.tag === 'class_component') {\n    reconcileChildren(fiber, fiber.stateNode.render());\n  } else if (fiber.tag === 'function_component') {\n    reconcileChildren(fiber, fiber.stateNode(fiber.props));\n  } else {\n    reconcileChildren(fiber, fiber.props.children);\n  }\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  var currentExcutFiber = fiber;\n\n  while (currentExcutFiber.parent) {\n    currentExcutFiber.parent.effects = currentExcutFiber.parent.effects.concat(currentExcutFiber.effects.concat([currentExcutFiber]));\n\n    if (currentExcutFiber.sibling) {\n      return currentExcutFiber.sibling;\n    }\n\n    currentExcutFiber = currentExcutFiber.parent;\n  }\n\n  pendingCommit = currentExcutFiber;\n};\n\nvar workLoop = function workLoop(IdleDeadline) {\n  // 如果没有自认为就去获取自认为\n  if (!subTask) {\n    subTask = getFirstTask();\n  } // 如果自任务存在并且浏览器有空闲事件\n  // 就去执行任务\n  // executeTask执行任务，并返回新任务\n\n\n  while (subTask && IdleDeadline.timeRemaining() > 1) {\n    subTask = executeTask(subTask);\n  }\n\n  if (pendingCommit) {\n    commitAllWork(pendingCommit);\n  }\n};\n\nvar performTask = function performTask(IdleDeadline) {\n  // 执行任务\n  workLoop(IdleDeadline); // 判断任务队列中是否还有任务\n  // 如果还有任务就再次告诉浏览者在空闲时执行任务\n\n  if (subTask && !taskSqueens.isEmpty()) {\n    requestIdleCallback(performTask);\n  }\n};\n\nfunction render(element, dom) {\n  // 想任务队列中添加任务\n  // 添加的任务就是通过vdom对象够艰难fiber对象\n  taskSqueens.push({\n    dom: dom,\n    props: {\n      children: element\n    }\n  }); // 指定你浏览器在空闲是去执行任务\n\n  requestIdleCallback(performTask);\n}\n\n//# sourceURL=webpack://fiber/./src/react/render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;