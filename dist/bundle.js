/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/p5/lib/p5.min.js":
/*!***************************************!*\
  !*** ./node_modules/p5/lib/p5.min.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/***/ }),

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);\n\nlet socket = new WebSocket(\"ws://localhost:3000\"); //make me a socket\nlet c = 0; // color variable\nlet mySound;\nlet dragSound;\nlet pg;\nlet colorPicker;\nvar now = new Date();\nvar startTicks = now.getTime();\nconst s = (p) => {\n    p.preload = () => {\n        // Load your sounds and other assets\n        // mySound = p.loadSound('PS2.wav');\n        // dragSound = p.loadSound('fx.wav');\n    };\n    p.setup = () => {\n        p.createCanvas(p.windowWidth, p.windowHeight);\n        p.colorMode(p.HSB, 255);\n        p.background(0);\n        c = p.random(255); //random color\n        p.noStroke();\n        // Initialize your color picker and other elements here\n        // Note: DOM elements might need to be handled differently in instance mode\n    };\n    p.draw = () => {\n        let currentNow = new Date();\n        let currentTicks = currentNow.getTime();\n        if (currentTicks - startTicks >= 500) {\n            p.noStroke();\n            p.fill(0, 20);\n            p.rect(0, 0, p.width, p.height);\n            startTicks = currentTicks;\n        }\n    };\n    p.mouseDragged = () => {\n        if (c === 0) {\n            return; // Skip function if c hasn't been set yet\n        }\n        let relX = p.mouseX / p.width;\n        let relY = p.mouseY / p.height;\n        let relPMouseX = p.pmouseX / p.width;\n        let relPMouseY = p.pmouseY / p.height;\n        let distance = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);\n        let strokeWeightVal = detectMob() ? distance / 10 : distance / 30;\n        strokeWeightVal = p.constrain(strokeWeightVal, 1, 20);\n        p.stroke(c, 255, 255);\n        p.strokeWeight(strokeWeightVal);\n        p.line(relPMouseX * p.width, relPMouseY * p.height, relX * p.width, relY * p.height);\n        let message = JSON.stringify({\n            type: 'line',\n            x1: relPMouseX,\n            y1: relPMouseY,\n            x2: relX,\n            y2: relY,\n            c: c,\n            strokeWeight: strokeWeightVal\n        });\n        socket.send(message);\n    };\n};\nnew (p5__WEBPACK_IMPORTED_MODULE_0___default())(s);\n// function setup() {\n//     console.log(windowWidth, windowHeight);\n//     createCanvas(windowWidth, windowHeight);\n//     colorMode(HSB, 255);\n//     background(0);\n//     c = random(255); //random color\n//     noStroke();\n//     colorPicker = createColorPicker('#ed225d');\n//     colorPicker.position(0, height + 5);\n// }\nfunction detectMob() {\n    if ((window.innerWidth <= 800) && (window.innerHeight <= 600)) {\n        return true;\n    }\n    else {\n        return false;\n    }\n}\n;\n// const bodyElement = document.getElementById('body');\n// if (bodyElement !== null){\n//     bodyElement.ontouchend = (e) => {\n//         e.preventDefault();\n//     };\n// }\n// // function windowResized() {\n// //     resizeCanvas(windowWidth, windowHeight, true);\n// //   }\n// function draw() {\n//     var currentNow = new Date();\n//     var currentTicks = currentNow.getTime();\n//     if (currentTicks - startTicks >= 500){\n//         noStroke();\n//         fill(0, 20);\n//         rect(0, 0, width, height);\n//         startTicks = currentTicks;\n//     }\n// }\n// socket.onopen = function(e) {\n//     console.log(\"connection established!!!!!\"); //confirming message\n//     // mySound.play();\n// }\n// socket.onmessage = function(e) {\n//     let message = JSON.parse(e.data);\n//     if (message.type === 'line'){\n//         stroke(message.c, 255, 255);\n//         strokeWeight(message.strokeWeight);\n//         line(message.x1 * width, message.y1 * height, message.x2 * width, message.y2 * height);\n//     }\n// }\n// function mouseDragged() {\n//     console.log(\"Dragging Mouse\");\n//     if (c === 0){\n//         return; // Skip function if c hasn't been set yet\n//     }\n//     let relX = mouseX / width;\n//     let relY = mouseY / height;\n//     let relPMouseX = pmouseX / width;\n//     let relPMouseY = pmouseY / height;\n//     let distance = dist(mouseX, mouseY, pmouseX, pmouseY);\n//     let strokeWeightVal = detectMob() ? distance / 10 : distance / 30;\n//     strokeWeightVal = constrain(strokeWeightVal, 1, 20);\n//     stroke(c, 255, 255);\n//     strokeWeight(strokeWeightVal);\n//     line(pmouseX, pmouseY, mouseX, mouseY);\n//     // let pbRate = map(mouseY, height, 0, .25, 2.);\n//     // let rlSpace = map(mouseX, 0., width, -1., 1.);\n//     // dragSound.rate(pbRate);\n//     // dragSound.pan(rlSpace);\n//     // dragSound.play();\n//     let message = JSON.stringify({\n//         type: 'line',\n//         x1: relPMouseX,\n//         y1: relPMouseY,\n//         x2: relX,\n//         y2: relY,\n//         c: c,\n//         strokeWeight: strokeWeightVal\n//     });\n//     socket.send(message);\n// }\n\n\n//# sourceURL=webpack://shared-canvas/./src/script.ts?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.ts");
/******/ 	
/******/ })()
;