/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("const Heading = __webpack_require__(/*! ./scripts/heading */ \"./src/scripts/heading.js\");\n\nconst tourneyData = __webpack_require__(/*! ./tournamentdata.json */ \"./src/tournamentdata.json\");\n\nconsole.log(tourneyData.nodes[0]);\ntourneyData.nodes.forEach(tournament => {\n  if (tournament.events.Melee) console.log(tournament.events.Melee.attendeeList.length);\n});\n\nfunction removeAllChildNodes(parent) {\n  while (parent.firstChild) {\n    parent.removeChild(parent.firstChild);\n  }\n\n  ;\n}\n\n;\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  document.getElementById(\"search-for-tournies-button\").addEventListener('click', event => {\n    event.preventDefault();\n    let findTournament = {\n      game: document.getElementById(\"game\").value,\n      state: document.getElementById(\"state\").value\n    };\n    let inputtedGame = findTournament.game;\n    let inputtedState = findTournament.state;\n    const tournamentList = document.querySelector(\"#tournament-listings\");\n    removeAllChildNodes(tournamentList);\n    tourneyData.nodes.forEach(tournament => {\n      if (tournament.events[inputtedGame] && tournament.addrState === inputtedState) {\n        let tourney = tournamentList.appendChild(document.createElement('li'));\n        tourney.innerHTML = `\n        <a href=\"https://www.start.gg/${tournament.slug}\" target=\"_blank\">${tournament.name} | ${tournament.city}, ${tournament.addrState} | Entrants: ${tournament.events[inputtedGame].attendeeList.length}</a>\n        `;\n      }\n    });\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsT0FBTyxHQUFHQyxtQkFBTyxDQUFDLG1EQUFELENBQXZCOztBQUVBLE1BQU1DLFdBQVcsR0FBR0QsbUJBQU8sQ0FBQyx3REFBRCxDQUEzQjs7QUFFQUUsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFdBQVcsQ0FBQ0csS0FBWixDQUFrQixDQUFsQixDQUFaO0FBRUFILFdBQVcsQ0FBQ0csS0FBWixDQUFrQkMsT0FBbEIsQ0FBMkJDLFVBQUQsSUFBZ0I7RUFDeEMsSUFBSUEsVUFBVSxDQUFDQyxNQUFYLENBQWtCQyxLQUF0QixFQUNBTixPQUFPLENBQUNDLEdBQVIsQ0FBWUcsVUFBVSxDQUFDQyxNQUFYLENBQWtCQyxLQUFsQixDQUF3QkMsWUFBeEIsQ0FBcUNDLE1BQWpEO0FBQ0QsQ0FIRDs7QUFLQSxTQUFTQyxtQkFBVCxDQUE2QkMsTUFBN0IsRUFBcUM7RUFDbkMsT0FBT0EsTUFBTSxDQUFDQyxVQUFkLEVBQTBCO0lBQ3RCRCxNQUFNLENBQUNFLFdBQVAsQ0FBbUJGLE1BQU0sQ0FBQ0MsVUFBMUI7RUFDSDs7RUFBQTtBQUNGOztBQUFBO0FBRURFLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLE1BQU07RUFDbERELFFBQVEsQ0FBQ0UsY0FBVCxDQUF3Qiw0QkFBeEIsRUFBc0RELGdCQUF0RCxDQUF1RSxPQUF2RSxFQUFpRkUsS0FBRCxJQUFXO0lBQ3pGQSxLQUFLLENBQUNDLGNBQU47SUFDQSxJQUFJQyxjQUFjLEdBQUc7TUFDbkJDLElBQUksRUFBRU4sUUFBUSxDQUFDRSxjQUFULENBQXdCLE1BQXhCLEVBQWdDSyxLQURuQjtNQUVuQkMsS0FBSyxFQUFFUixRQUFRLENBQUNFLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUNLO0lBRnJCLENBQXJCO0lBS0EsSUFBSUUsWUFBWSxHQUFHSixjQUFjLENBQUNDLElBQWxDO0lBQ0EsSUFBSUksYUFBYSxHQUFHTCxjQUFjLENBQUNHLEtBQW5DO0lBRUEsTUFBTUcsY0FBYyxHQUFHWCxRQUFRLENBQUNZLGFBQVQsQ0FBdUIsc0JBQXZCLENBQXZCO0lBQ0FoQixtQkFBbUIsQ0FBQ2UsY0FBRCxDQUFuQjtJQUVBekIsV0FBVyxDQUFDRyxLQUFaLENBQWtCQyxPQUFsQixDQUEyQkMsVUFBRCxJQUFnQjtNQUN4QyxJQUFJQSxVQUFVLENBQUNDLE1BQVgsQ0FBa0JpQixZQUFsQixLQUFtQ2xCLFVBQVUsQ0FBQ3NCLFNBQVgsS0FBeUJILGFBQWhFLEVBQStFO1FBQzdFLElBQUlJLE9BQU8sR0FBR0gsY0FBYyxDQUFDSSxXQUFmLENBQTJCZixRQUFRLENBQUNnQixhQUFULENBQXVCLElBQXZCLENBQTNCLENBQWQ7UUFDQUYsT0FBTyxDQUFDRyxTQUFSLEdBQXFCO0FBQzdCLHdDQUF3QzFCLFVBQVUsQ0FBQzJCLElBQUsscUJBQW9CM0IsVUFBVSxDQUFDNEIsSUFBSyxNQUFLNUIsVUFBVSxDQUFDNkIsSUFBSyxLQUFJN0IsVUFBVSxDQUFDc0IsU0FBVSxnQkFBZXRCLFVBQVUsQ0FBQ0MsTUFBWCxDQUFrQmlCLFlBQWxCLEVBQWdDZixZQUFoQyxDQUE2Q0MsTUFBTztBQUM3TSxTQUZRO01BR0Q7SUFDRixDQVBEO0VBUUQsQ0FyQkQ7QUF1QkQsQ0F4QkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBIZWFkaW5nID0gcmVxdWlyZSgnLi9zY3JpcHRzL2hlYWRpbmcnKTtcblxuY29uc3QgdG91cm5leURhdGEgPSByZXF1aXJlKCcuL3RvdXJuYW1lbnRkYXRhLmpzb24nKTtcblxuY29uc29sZS5sb2codG91cm5leURhdGEubm9kZXNbMF0pO1xuXG50b3VybmV5RGF0YS5ub2Rlcy5mb3JFYWNoKCh0b3VybmFtZW50KSA9PiB7XG4gIGlmICh0b3VybmFtZW50LmV2ZW50cy5NZWxlZSlcbiAgY29uc29sZS5sb2codG91cm5hbWVudC5ldmVudHMuTWVsZWUuYXR0ZW5kZWVMaXN0Lmxlbmd0aClcbn0pXG5cbmZ1bmN0aW9uIHJlbW92ZUFsbENoaWxkTm9kZXMocGFyZW50KSB7XG4gIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbiAgfTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtZm9yLXRvdXJuaWVzLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IGZpbmRUb3VybmFtZW50ID0ge1xuICAgICAgZ2FtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lXCIpLnZhbHVlLFxuICAgICAgc3RhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdGVcIikudmFsdWVcbiAgICB9O1xuXG4gICAgbGV0IGlucHV0dGVkR2FtZSA9IGZpbmRUb3VybmFtZW50LmdhbWU7XG4gICAgbGV0IGlucHV0dGVkU3RhdGUgPSBmaW5kVG91cm5hbWVudC5zdGF0ZTtcblxuICAgIGNvbnN0IHRvdXJuYW1lbnRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b3VybmFtZW50LWxpc3RpbmdzXCIpO1xuICAgIHJlbW92ZUFsbENoaWxkTm9kZXModG91cm5hbWVudExpc3QpOyBcblxuICAgIHRvdXJuZXlEYXRhLm5vZGVzLmZvckVhY2goKHRvdXJuYW1lbnQpID0+IHtcbiAgICAgIGlmICh0b3VybmFtZW50LmV2ZW50c1tpbnB1dHRlZEdhbWVdICYmIHRvdXJuYW1lbnQuYWRkclN0YXRlID09PSBpbnB1dHRlZFN0YXRlKSB7XG4gICAgICAgIGxldCB0b3VybmV5ID0gdG91cm5hbWVudExpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKSlcbiAgICAgICAgdG91cm5leS5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5zdGFydC5nZy8ke3RvdXJuYW1lbnQuc2x1Z31cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke3RvdXJuYW1lbnQubmFtZX0gfCAke3RvdXJuYW1lbnQuY2l0eX0sICR7dG91cm5hbWVudC5hZGRyU3RhdGV9IHwgRW50cmFudHM6ICR7dG91cm5hbWVudC5ldmVudHNbaW5wdXR0ZWRHYW1lXS5hdHRlbmRlZUxpc3QubGVuZ3RofTwvYT5cbiAgICAgICAgYFxuICAgICAgfVxuICAgIH0pIFxuICB9KVxuICBcbn0pXG5cblxuIl0sIm5hbWVzIjpbIkhlYWRpbmciLCJyZXF1aXJlIiwidG91cm5leURhdGEiLCJjb25zb2xlIiwibG9nIiwibm9kZXMiLCJmb3JFYWNoIiwidG91cm5hbWVudCIsImV2ZW50cyIsIk1lbGVlIiwiYXR0ZW5kZWVMaXN0IiwibGVuZ3RoIiwicmVtb3ZlQWxsQ2hpbGROb2RlcyIsInBhcmVudCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEVsZW1lbnRCeUlkIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImZpbmRUb3VybmFtZW50IiwiZ2FtZSIsInZhbHVlIiwic3RhdGUiLCJpbnB1dHRlZEdhbWUiLCJpbnB1dHRlZFN0YXRlIiwidG91cm5hbWVudExpc3QiLCJxdWVyeVNlbGVjdG9yIiwiYWRkclN0YXRlIiwidG91cm5leSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInNsdWciLCJuYW1lIiwiY2l0eSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/heading.js":
/*!********************************!*\
  !*** ./src/scripts/heading.js ***!
  \********************************/
/***/ (function(module) {

eval("function Heading(text) {\n  this.text = text;\n  this.heading = `<h2>${this.text}</h2>`;\n}\n\nmodule.exports = Heading;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9oZWFkaW5nLmpzLmpzIiwibmFtZXMiOlsiSGVhZGluZyIsInRleHQiLCJoZWFkaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaGVhZGluZy5qcz84MTRjIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEhlYWRpbmcodGV4dCkge1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgdGhpcy5oZWFkaW5nID0gYDxoMj4ke3RoaXMudGV4dH08L2gyPmA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGluZztcblxuIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxPQUFULENBQWlCQyxJQUFqQixFQUF1QjtFQUNuQixLQUFLQSxJQUFMLEdBQVlBLElBQVo7RUFDQSxLQUFLQyxPQUFMLEdBQWdCLE9BQU0sS0FBS0QsSUFBSyxPQUFoQztBQUNIOztBQUVERSxNQUFNLENBQUNDLE9BQVAsR0FBaUJKLE9BQWpCIn0=\n//# sourceURL=webpack-internal:///./src/scripts/heading.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ }),

/***/ "./src/tournamentdata.json":
/*!*********************************!*\
  !*** ./src/tournamentdata.json ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"nodes":[{"slug":"tournament/syracuse-smash-rgc-2022","id":1,"name":"Syracuse Smash @ RGC 2022","city":"Syracuse","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]}}},{"slug":"tournament/pk-fire-10","id":2,"name":"PK Fire 10","city":"Poughkeepsie","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]},"Super Smash Bros. Ultimate":{"attendeeList":["MKLeo","Tweek","Sparg0","Hungrybox","Light","Wizzrobe","Maister","FlimFlam","Boople","Sham","John","BuckleBeeBlap"]}}},{"slug":"tournament/the-honeycomb-iv","id":3,"name":"The Honeycomb IV","city":"Rochester","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]},"Ultimate":{"attendeeList":["MKLeo","Tweek","Sparg0","Hungrybox","Light","Wizzrobe","Maister","FlimFlam","Boople","Sham","John","BuckleBeeBlap"]}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":4,"name":"NYU Melee Torch Fest #3 (WITH AMATEUR BRACKET)","city":"Brooklyn","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]}}},{"slug":"tournament/the-nightclub-s4e10-os-nyc","id":5,"name":"The Nightclub S4E10 @ OS NYC","city":"New York","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":6,"name":"NYU Melee Torch Fest #3 (WITH AMATEUR BRACKET)","city":"Brooklyn","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":7,"name":"The Function 2","city":"Brooklyn","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":8,"name":"Another NYC Tournament??? #136","city":"New York","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":9,"name":"Smash The Spire #13","city":"Bronx","addrState":"NY","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]}}},{"slug":"tournament/apex-2022/details","id":10,"name":"Apex 2022","city":"Secaucus","addrState":"NJ","events":{"Super Smash Bros. Melee":{"attendeeList":["Mango","Hungrybox","Zain","iBDW","Zuppy","Amsa","Leffen","a horse who can drive","Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]},"Super Smash Bros. Ultimate":{"attendeeList":["MKLeo","Tweek","Sparg0","Hungrybox","Light","Wizzrobe","Maister","FlimFlam","Boople","Sham","John","BuckleBeeBlap"]}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":11,"name":" Stage Select #84","city":"Jersey City","addrState":"NJ","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"]}}}]}');

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;