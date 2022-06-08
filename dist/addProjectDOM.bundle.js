/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/addProject.js":
/*!***************************!*\
  !*** ./src/addProject.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProjectNavBtn": () => (/* binding */ addProjectNavBtn),
/* harmony export */   "projectInput": () => (/* binding */ projectInput),
/* harmony export */   "projects": () => (/* binding */ projects),
/* harmony export */   "createProjects": () => (/* binding */ createProjects)
/* harmony export */ });
/* harmony import */ var _inbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inbox */ "./src/inbox.js");
/* harmony import */ var _addProjectDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addProjectDOM */ "./src/addProjectDOM.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");




const addProjectNavBtn = document.querySelector('[data-add-project-nav-btn]');
const cancelProjectBtn = document.querySelector('[data-cancel-project-btn]');
const projectInput = document.querySelector('[data-input-project-title]');

let projects = (0,_inbox__WEBPACK_IMPORTED_MODULE_0__.getSavedStorage)('projects');

(0,_addProjectDOM__WEBPACK_IMPORTED_MODULE_1__.renderProjects)(projects);

// Factory function that creates projects
function createProjects() {
    return {
        createProject() {
            projects.push({
                title: projectInput.value,
                tasks: [], // want the todos in here
                id: (0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])(),
            });
        }
    }
}

addProjectNavBtn.addEventListener('click', (e) => {
    (0,_inbox__WEBPACK_IMPORTED_MODULE_0__.toggleInboxPopup)('[data-add-project-popup]', addProjectNavBtn);
});

cancelProjectBtn.addEventListener('click', (e) => {
    (0,_inbox__WEBPACK_IMPORTED_MODULE_0__.toggleInboxPopup)('[data-add-project-popup]', addProjectNavBtn);
});

/***/ }),

/***/ "./src/addProjectDOM.js":
/*!******************************!*\
  !*** ./src/addProjectDOM.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "incompleteTodos": () => (/* binding */ incompleteTodos),
/* harmony export */   "generateProjectDOM": () => (/* binding */ generateProjectDOM),
/* harmony export */   "renderProjects": () => (/* binding */ renderProjects),
/* harmony export */   "pushTodos": () => (/* binding */ pushTodos),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _inbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inbox */ "./src/inbox.js");
/* harmony import */ var _addProject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addProject */ "./src/addProject.js");
/* harmony import */ var _inboxDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inboxDOM */ "./src/inboxDOM.js");




let incompleteTodos = []; // now a global variable.

function generateProjectDOM(project) {
    const individualProjectContainer = document.createElement('div');
    const projectEl = document.createElement('button');
    const deleteProjectBtn = document.createElement('button');

    individualProjectContainer.classList.add('projects', 'show-display-flex', 'justify-content-space-between');

    projectEl.textContent = project.title;
    individualProjectContainer.appendChild(projectEl);
    projectEl.classList.add('enter-project-button');
    // below is more than likely wrong, but we can at least see some functionality
    projectEl.addEventListener('click', (e) => {
        // saveToLocalStorage('projects', projects); // just added
        _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.textContent = '';
        pushTodos(_addProject__WEBPACK_IMPORTED_MODULE_1__.projects);
        _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.inboxTitle.textContent = e.srcElement.textContent;

        const specificTodos = incompleteTodos.filter((todo) => {
            if (e.srcElement.textContent === todo.placeTodo) {
                return todo.title
            }
        });

        specificTodos.forEach((todo) => {
            _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.appendChild((0,_inboxDOM__WEBPACK_IMPORTED_MODULE_2__.generateTodoDOM)(todo));
        });
    });

    deleteProjectBtn.textContent = 'X';
    individualProjectContainer.appendChild(deleteProjectBtn);
    deleteProjectBtn.classList.add('delete-project-btn');
    deleteProjectBtn.addEventListener('click', (e) => {
        _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.innerHTML = '';
        _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.inboxTitle.innerHTML = '';
        (0,_inbox__WEBPACK_IMPORTED_MODULE_0__.deleteItem)(project.id, _addProject__WEBPACK_IMPORTED_MODULE_1__.projects);
        (0,_inboxDOM__WEBPACK_IMPORTED_MODULE_2__.saveToLocalStorage)('projects', _addProject__WEBPACK_IMPORTED_MODULE_1__.projects);
        renderProjects(_addProject__WEBPACK_IMPORTED_MODULE_1__.projects, _addProject__WEBPACK_IMPORTED_MODULE_1__.projects.title);
    });

    return individualProjectContainer;
}

function renderProjects(projects) {
    const projectsContainer = document.querySelector('[data-projects-container]');

    projectsContainer.innerHTML = '';
    projects.forEach((project) => {
        projectsContainer.appendChild(generateProjectDOM(project));
    });
}

function pushTodos(projects) {
    _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.textContent = '';

    for (let i = 0; i <= projects.length - 1; i++) {
        projects[i].tasks.forEach((task) => {
            if (incompleteTodos.includes(task)) {
                // console.log('task already in array')
                return null;
            }
             else {
                incompleteTodos.push(task);
            }
             
        });
    }
}

function render(projectId, todoPlace) {
    // todosContainer.textContent = '';
    let specificTodos = [];

    // console.log(incompleteTodos);
    // console.log(projects);

    // need to match the placeTodo with the project title. If there is a match then display the project's tasks. Don't want to loop, want to specifically target with the params
    const projectIndex = _addProject__WEBPACK_IMPORTED_MODULE_1__.projects.findIndex((project) => {
        return project.id === projectId // gives a specific project
    });
    // console.log(projectIndex);

    if (_addProject__WEBPACK_IMPORTED_MODULE_1__.projects[projectIndex].title === todoPlace) {
        _addProject__WEBPACK_IMPORTED_MODULE_1__.projects[projectIndex].tasks.forEach((task) => {
            specificTodos.push(task.title);
        });
    }

    console.log(specificTodos); // shows all of the projects array, the one I want is correct, but I don't want the others displaying. Might be because of where this function is placed in inboxDOM.js

    return specificTodos;

    // specificTodos.forEach((todo) => {
    //     todosContainer.appendChild(generateTodoDOM(todo));
    // });
}

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "title": () => (/* binding */ title),
/* harmony export */   "priority": () => (/* binding */ priority),
/* harmony export */   "date": () => (/* binding */ date),
/* harmony export */   "placeTodo": () => (/* binding */ placeTodo),
/* harmony export */   "deleteItem": () => (/* binding */ deleteItem),
/* harmony export */   "deleteTodo": () => (/* binding */ deleteTodo),
/* harmony export */   "getSavedStorage": () => (/* binding */ getSavedStorage),
/* harmony export */   "toggleInboxPopup": () => (/* binding */ toggleInboxPopup),
/* harmony export */   "Todos": () => (/* binding */ Todos)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _addProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addProject */ "./src/addProject.js");
/* harmony import */ var _addProjectDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addProjectDOM */ "./src/addProjectDOM.js");




const title = document.querySelector('#todo-to-add-text');
const priority = document.querySelector('[data-priority]');
const date = document.querySelector('[data-date]');
const placeTodo = document.querySelector('[data-place-todo]') // just added

function deleteItem(id, array) {
    const itemIndex = array.findIndex((todo) => {
        return todo.id === id;
    });

    if (itemIndex > -1) {
        array.splice(itemIndex, 1);
    }
}

function deleteTodo(todoId, projectId) {

    const projectIndex = _addProject__WEBPACK_IMPORTED_MODULE_0__.projects.findIndex((project) => {
        return project.id === projectId
    })

    const todoIndex = _addProject__WEBPACK_IMPORTED_MODULE_0__.projects[projectIndex].tasks.findIndex((todo) => {
        return todo.id === todoId;
    });
    
    if (todoIndex > -1) {
        _addProject__WEBPACK_IMPORTED_MODULE_0__.projects[projectIndex].tasks.splice(todoIndex, 1);
    }
}

function getSavedStorage(savedStorage) {
    const todosJSON = localStorage.getItem(savedStorage);

    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else {
        return [];
    }
};

function toggleInboxPopup(element, btn) {
    const taskPopup = document.querySelector(element);
    btn.classList.toggle('hide-display');
    taskPopup.classList.toggle('show-display-flex');
}

// Factory function in charge of inbox todos including creation
function Todos() {
    return {
        createTodo() {
            return {
                placeTodo: placeTodo.value, // just added
                title: title.value,
                priority: priority.value.toLowerCase(),
                id: (0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])(),
                completed: false,
                // date: date.value,
            };
        },
    }
}

/***/ }),

/***/ "./src/inboxDOM.js":
/*!*************************!*\
  !*** ./src/inboxDOM.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "todosContainer": () => (/* binding */ todosContainer),
/* harmony export */   "inboxTitle": () => (/* binding */ inboxTitle),
/* harmony export */   "saveToLocalStorage": () => (/* binding */ saveToLocalStorage),
/* harmony export */   "generateTodoDOM": () => (/* binding */ generateTodoDOM)
/* harmony export */ });
/* harmony import */ var _inbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inbox.js */ "./src/inbox.js");
/* harmony import */ var _addProject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addProject.js */ "./src/addProject.js");
/* harmony import */ var _addProjectDOM_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addProjectDOM.js */ "./src/addProjectDOM.js");




const todosContainer = document.querySelector('#todos-display-container');
const inboxTitle = document.querySelector('[data-project-title-text]');

function saveToLocalStorage(key, stringifyVar) {
    localStorage.setItem(key, JSON.stringify(stringifyVar));
}

function generateTodoDOM(todo) {
    const individualTodoContainer = document.createElement('div');
    const todoEl = document.createElement('span');
    const markComplete = document.createElement('input');
    const completedText = document.createElement('span');
    // const dateDue = document.createElement('p');

    todoEl.textContent = `${todo.title} Priority: ${todo.priority}`; 
    todoEl.classList.add('todo-el');
    if (todo.priority === 'high') {
        todoEl.classList.add('red')
    }
    if (todo.priority === 'medium') {
        todoEl.classList.add('yellow')
    }
    if (todo.priority === 'low') {
            todoEl.classList.add('green')
    }
    individualTodoContainer.appendChild(todoEl);

    completedText.textContent = 'Completed?';
    individualTodoContainer.appendChild(completedText);

    // set up todo checkbox
    markComplete.setAttribute('type', 'checkbox');
    markComplete.classList.add('mark-complete');
    individualTodoContainer.appendChild(markComplete);
    markComplete.checked = todo.completed;
    markComplete.addEventListener('change', (e) => {
        (0,_addProjectDOM_js__WEBPACK_IMPORTED_MODULE_2__.pushTodos)(_addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects);

        _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects.filter((project) => {
            (0,_inbox_js__WEBPACK_IMPORTED_MODULE_0__.deleteTodo)(todo.id, project.id); // this works. It deletes the correct todo.
            saveToLocalStorage('projects', _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects);
            // location.reload(); // refreshes the web page
        });

        _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects.filter((project) => {
            (0,_addProjectDOM_js__WEBPACK_IMPORTED_MODULE_2__.render)(project.id, todo.placeTodo); // this will load the page with the correct todos
        });
    });

    // dateDue.textContent = `Due by ${todo.date}`
    // individualTodoContainer.appendChild(dateDue);
    // dateDue.classList.add('todo-el');

    return individualTodoContainer;
}

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/addProjectDOM.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb3MvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL3RvZG9zLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL3RvZG9zLy4vc3JjL2FkZFByb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9zcmMvYWRkUHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL3NyYy9pbmJveC5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL3NyYy9pbmJveERPTS5qcyIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG52YXIgZ2V0UmFuZG9tVmFsdWVzO1xudmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uIEFsc28sXG4gICAgLy8gZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIChtc0NyeXB0bykgb24gSUUxMS5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pIHx8IHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG52YXIgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKSk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIpIHtcbiAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHZhciB1dWlkID0gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsImltcG9ydCB7IHRvZ2dsZUluYm94UG9wdXAsIGdldFNhdmVkU3RvcmFnZSB9IGZyb20gXCIuL2luYm94XCI7XHJcbmltcG9ydCB7IHJlbmRlclByb2plY3RzIH0gZnJvbSBcIi4vYWRkUHJvamVjdERPTVwiO1xyXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRQcm9qZWN0TmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtYWRkLXByb2plY3QtbmF2LWJ0bl0nKTtcclxuY29uc3QgY2FuY2VsUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbmNlbC1wcm9qZWN0LWJ0bl0nKTtcclxuZXhwb3J0IGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlucHV0LXByb2plY3QtdGl0bGVdJyk7XHJcblxyXG5leHBvcnQgbGV0IHByb2plY3RzID0gZ2V0U2F2ZWRTdG9yYWdlKCdwcm9qZWN0cycpO1xyXG5cclxucmVuZGVyUHJvamVjdHMocHJvamVjdHMpO1xyXG5cclxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgcHJvamVjdHNcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RzKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVQcm9qZWN0KCkge1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBwcm9qZWN0SW5wdXQudmFsdWUsXHJcbiAgICAgICAgICAgICAgICB0YXNrczogW10sIC8vIHdhbnQgdGhlIHRvZG9zIGluIGhlcmVcclxuICAgICAgICAgICAgICAgIGlkOiB1dWlkdjQoKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hZGRQcm9qZWN0TmF2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIHRvZ2dsZUluYm94UG9wdXAoJ1tkYXRhLWFkZC1wcm9qZWN0LXBvcHVwXScsIGFkZFByb2plY3ROYXZCdG4pO1xyXG59KTtcclxuXHJcbmNhbmNlbFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgdG9nZ2xlSW5ib3hQb3B1cCgnW2RhdGEtYWRkLXByb2plY3QtcG9wdXBdJywgYWRkUHJvamVjdE5hdkJ0bik7XHJcbn0pOyIsImltcG9ydCB7IGRlbGV0ZUl0ZW0sIFRvZG9zIH0gZnJvbSBcIi4vaW5ib3hcIjtcclxuaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tIFwiLi9hZGRQcm9qZWN0XCI7XHJcbmltcG9ydCB7IHNhdmVUb0xvY2FsU3RvcmFnZSwgaW5ib3hUaXRsZSwgdG9kb3NDb250YWluZXIsIGdlbmVyYXRlVG9kb0RPTSB9IGZyb20gXCIuL2luYm94RE9NXCI7XHJcblxyXG5leHBvcnQgbGV0IGluY29tcGxldGVUb2RvcyA9IFtdOyAvLyBub3cgYSBnbG9iYWwgdmFyaWFibGUuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQcm9qZWN0RE9NKHByb2plY3QpIHtcclxuICAgIGNvbnN0IGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBwcm9qZWN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBpbmRpdmlkdWFsUHJvamVjdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0cycsICdzaG93LWRpc3BsYXktZmxleCcsICdqdXN0aWZ5LWNvbnRlbnQtc3BhY2UtYmV0d2VlbicpO1xyXG5cclxuICAgIHByb2plY3RFbC50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICBpbmRpdmlkdWFsUHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RWwpO1xyXG4gICAgcHJvamVjdEVsLmNsYXNzTGlzdC5hZGQoJ2VudGVyLXByb2plY3QtYnV0dG9uJyk7XHJcbiAgICAvLyBiZWxvdyBpcyBtb3JlIHRoYW4gbGlrZWx5IHdyb25nLCBidXQgd2UgY2FuIGF0IGxlYXN0IHNlZSBzb21lIGZ1bmN0aW9uYWxpdHlcclxuICAgIHByb2plY3RFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgLy8gc2F2ZVRvTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycsIHByb2plY3RzKTsgLy8ganVzdCBhZGRlZFxyXG4gICAgICAgIHRvZG9zQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgcHVzaFRvZG9zKHByb2plY3RzKTtcclxuICAgICAgICBpbmJveFRpdGxlLnRleHRDb250ZW50ID0gZS5zcmNFbGVtZW50LnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICBjb25zdCBzcGVjaWZpY1RvZG9zID0gaW5jb21wbGV0ZVRvZG9zLmZpbHRlcigodG9kbykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5zcmNFbGVtZW50LnRleHRDb250ZW50ID09PSB0b2RvLnBsYWNlVG9kbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvZG8udGl0bGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzcGVjaWZpY1RvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcclxuICAgICAgICAgICAgdG9kb3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVUb2RvRE9NKHRvZG8pKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlbGV0ZVByb2plY3RCdG4udGV4dENvbnRlbnQgPSAnWCc7XHJcbiAgICBpbmRpdmlkdWFsUHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0QnRuKTtcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXByb2plY3QtYnRuJyk7XHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICB0b2Rvc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBpbmJveFRpdGxlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGRlbGV0ZUl0ZW0ocHJvamVjdC5pZCwgcHJvamVjdHMpO1xyXG4gICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgncHJvamVjdHMnLCBwcm9qZWN0cyk7XHJcbiAgICAgICAgcmVuZGVyUHJvamVjdHMocHJvamVjdHMsIHByb2plY3RzLnRpdGxlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpbmRpdmlkdWFsUHJvamVjdENvbnRhaW5lcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclByb2plY3RzKHByb2plY3RzKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2plY3RzLWNvbnRhaW5lcl0nKTtcclxuXHJcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChnZW5lcmF0ZVByb2plY3RET00ocHJvamVjdCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdXNoVG9kb3MocHJvamVjdHMpIHtcclxuICAgIHRvZG9zQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcHJvamVjdHMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgcHJvamVjdHNbaV0udGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5jb21wbGV0ZVRvZG9zLmluY2x1ZGVzKHRhc2spKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndGFzayBhbHJlYWR5IGluIGFycmF5JylcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluY29tcGxldGVUb2Rvcy5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihwcm9qZWN0SWQsIHRvZG9QbGFjZSkge1xyXG4gICAgLy8gdG9kb3NDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGxldCBzcGVjaWZpY1RvZG9zID0gW107XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coaW5jb21wbGV0ZVRvZG9zKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuXHJcbiAgICAvLyBuZWVkIHRvIG1hdGNoIHRoZSBwbGFjZVRvZG8gd2l0aCB0aGUgcHJvamVjdCB0aXRsZS4gSWYgdGhlcmUgaXMgYSBtYXRjaCB0aGVuIGRpc3BsYXkgdGhlIHByb2plY3QncyB0YXNrcy4gRG9uJ3Qgd2FudCB0byBsb29wLCB3YW50IHRvIHNwZWNpZmljYWxseSB0YXJnZXQgd2l0aCB0aGUgcGFyYW1zXHJcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwcm9qZWN0cy5maW5kSW5kZXgoKHByb2plY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkIC8vIGdpdmVzIGEgc3BlY2lmaWMgcHJvamVjdFxyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0SW5kZXgpO1xyXG5cclxuICAgIGlmIChwcm9qZWN0c1twcm9qZWN0SW5kZXhdLnRpdGxlID09PSB0b2RvUGxhY2UpIHtcclxuICAgICAgICBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICAgICAgc3BlY2lmaWNUb2Rvcy5wdXNoKHRhc2sudGl0bGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHNwZWNpZmljVG9kb3MpOyAvLyBzaG93cyBhbGwgb2YgdGhlIHByb2plY3RzIGFycmF5LCB0aGUgb25lIEkgd2FudCBpcyBjb3JyZWN0LCBidXQgSSBkb24ndCB3YW50IHRoZSBvdGhlcnMgZGlzcGxheWluZy4gTWlnaHQgYmUgYmVjYXVzZSBvZiB3aGVyZSB0aGlzIGZ1bmN0aW9uIGlzIHBsYWNlZCBpbiBpbmJveERPTS5qc1xyXG5cclxuICAgIHJldHVybiBzcGVjaWZpY1RvZG9zO1xyXG5cclxuICAgIC8vIHNwZWNpZmljVG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xyXG4gICAgLy8gICAgIHRvZG9zQ29udGFpbmVyLmFwcGVuZENoaWxkKGdlbmVyYXRlVG9kb0RPTSh0b2RvKSk7XHJcbiAgICAvLyB9KTtcclxufSIsImltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vYWRkUHJvamVjdCc7XHJcbmltcG9ydCB7IGluY29tcGxldGVUb2RvcyB9IGZyb20gJy4vYWRkUHJvamVjdERPTSc7XHJcblxyXG5leHBvcnQgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby10by1hZGQtdGV4dCcpO1xyXG5leHBvcnQgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmlvcml0eV0nKTtcclxuZXhwb3J0IGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kYXRlXScpO1xyXG5leHBvcnQgY29uc3QgcGxhY2VUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGxhY2UtdG9kb10nKSAvLyBqdXN0IGFkZGVkXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlSXRlbShpZCwgYXJyYXkpIHtcclxuICAgIGNvbnN0IGl0ZW1JbmRleCA9IGFycmF5LmZpbmRJbmRleCgodG9kbykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0b2RvLmlkID09PSBpZDtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpdGVtSW5kZXggPiAtMSkge1xyXG4gICAgICAgIGFycmF5LnNwbGljZShpdGVtSW5kZXgsIDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlVG9kbyh0b2RvSWQsIHByb2plY3RJZCkge1xyXG5cclxuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHByb2plY3RzLmZpbmRJbmRleCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwcm9qZWN0LmlkID09PSBwcm9qZWN0SWRcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgdG9kb0luZGV4ID0gcHJvamVjdHNbcHJvamVjdEluZGV4XS50YXNrcy5maW5kSW5kZXgoKHRvZG8pID0+IHtcclxuICAgICAgICByZXR1cm4gdG9kby5pZCA9PT0gdG9kb0lkO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGlmICh0b2RvSW5kZXggPiAtMSkge1xyXG4gICAgICAgIHByb2plY3RzW3Byb2plY3RJbmRleF0udGFza3Muc3BsaWNlKHRvZG9JbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTYXZlZFN0b3JhZ2Uoc2F2ZWRTdG9yYWdlKSB7XHJcbiAgICBjb25zdCB0b2Rvc0pTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzYXZlZFN0b3JhZ2UpO1xyXG5cclxuICAgIGlmICh0b2Rvc0pTT04gIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0b2Rvc0pTT04pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlSW5ib3hQb3B1cChlbGVtZW50LCBidG4pIHtcclxuICAgIGNvbnN0IHRhc2tQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XHJcbiAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZS1kaXNwbGF5Jyk7XHJcbiAgICB0YXNrUG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1kaXNwbGF5LWZsZXgnKTtcclxufVxyXG5cclxuLy8gRmFjdG9yeSBmdW5jdGlvbiBpbiBjaGFyZ2Ugb2YgaW5ib3ggdG9kb3MgaW5jbHVkaW5nIGNyZWF0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBUb2RvcygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlVG9kbygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBsYWNlVG9kbzogcGxhY2VUb2RvLnZhbHVlLCAvLyBqdXN0IGFkZGVkXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHkudmFsdWUudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgICAgIGlkOiB1dWlkdjQoKSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBkYXRlOiBkYXRlLnZhbHVlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBkZWxldGVUb2RvLCBnZXRTYXZlZFN0b3JhZ2UgfSBmcm9tICcuL2luYm94LmpzJztcclxuaW1wb3J0IHsgcHJvamVjdHMsIHByb2plY3RJbnB1dCB9IGZyb20gJy4vYWRkUHJvamVjdC5qcyc7XHJcbmltcG9ydCB7IGluY29tcGxldGVUb2RvcywgcHVzaFRvZG9zLCByZW5kZXIgfSBmcm9tICcuL2FkZFByb2plY3RET00uanMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvZG9zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG9zLWRpc3BsYXktY29udGFpbmVyJyk7XHJcbmV4cG9ydCBjb25zdCBpbmJveFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvamVjdC10aXRsZS10ZXh0XScpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHN0cmluZ2lmeVZhcikge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShzdHJpbmdpZnlWYXIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlVG9kb0RPTSh0b2RvKSB7XHJcbiAgICBjb25zdCBpbmRpdmlkdWFsVG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgdG9kb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgY29uc3QgbWFya0NvbXBsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAvLyBjb25zdCBkYXRlRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cclxuICAgIHRvZG9FbC50ZXh0Q29udGVudCA9IGAke3RvZG8udGl0bGV9IFByaW9yaXR5OiAke3RvZG8ucHJpb3JpdHl9YDsgXHJcbiAgICB0b2RvRWwuY2xhc3NMaXN0LmFkZCgndG9kby1lbCcpO1xyXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09ICdoaWdoJykge1xyXG4gICAgICAgIHRvZG9FbC5jbGFzc0xpc3QuYWRkKCdyZWQnKVxyXG4gICAgfVxyXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09ICdtZWRpdW0nKSB7XHJcbiAgICAgICAgdG9kb0VsLmNsYXNzTGlzdC5hZGQoJ3llbGxvdycpXHJcbiAgICB9XHJcbiAgICBpZiAodG9kby5wcmlvcml0eSA9PT0gJ2xvdycpIHtcclxuICAgICAgICAgICAgdG9kb0VsLmNsYXNzTGlzdC5hZGQoJ2dyZWVuJylcclxuICAgIH1cclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9FbCk7XHJcblxyXG4gICAgY29tcGxldGVkVGV4dC50ZXh0Q29udGVudCA9ICdDb21wbGV0ZWQ/JztcclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXBsZXRlZFRleHQpO1xyXG5cclxuICAgIC8vIHNldCB1cCB0b2RvIGNoZWNrYm94XHJcbiAgICBtYXJrQ29tcGxldGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbiAgICBtYXJrQ29tcGxldGUuY2xhc3NMaXN0LmFkZCgnbWFyay1jb21wbGV0ZScpO1xyXG4gICAgaW5kaXZpZHVhbFRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQobWFya0NvbXBsZXRlKTtcclxuICAgIG1hcmtDb21wbGV0ZS5jaGVja2VkID0gdG9kby5jb21wbGV0ZWQ7XHJcbiAgICBtYXJrQ29tcGxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICBwdXNoVG9kb3MocHJvamVjdHMpO1xyXG5cclxuICAgICAgICBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlVG9kbyh0b2RvLmlkLCBwcm9qZWN0LmlkKTsgLy8gdGhpcyB3b3Jrcy4gSXQgZGVsZXRlcyB0aGUgY29ycmVjdCB0b2RvLlxyXG4gICAgICAgICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoJ3Byb2plY3RzJywgcHJvamVjdHMpO1xyXG4gICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTsgLy8gcmVmcmVzaGVzIHRoZSB3ZWIgcGFnZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgcmVuZGVyKHByb2plY3QuaWQsIHRvZG8ucGxhY2VUb2RvKTsgLy8gdGhpcyB3aWxsIGxvYWQgdGhlIHBhZ2Ugd2l0aCB0aGUgY29ycmVjdCB0b2Rvc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZGF0ZUR1ZS50ZXh0Q29udGVudCA9IGBEdWUgYnkgJHt0b2RvLmRhdGV9YFxyXG4gICAgLy8gaW5kaXZpZHVhbFRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQoZGF0ZUR1ZSk7XHJcbiAgICAvLyBkYXRlRHVlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tZWwnKTtcclxuXHJcbiAgICByZXR1cm4gaW5kaXZpZHVhbFRvZG9Db250YWluZXI7XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FkZFByb2plY3RET00uanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=