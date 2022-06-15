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
                tasks: [],
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

        specificTodos.filter((todo) => {
            render(project.id, todo.placeTodo);
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
                return null;
            }
             else {
                incompleteTodos.push(task);
            }
             
        });
    }
}

function render(projectId, todoPlace) {
    _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.innerHTML = '';
    // need to match the placeTodo with the project title. If there is a match then display the project's tasks. Don't want to loop, want to specifically target with the params
    const projectIndex = _addProject__WEBPACK_IMPORTED_MODULE_1__.projects.findIndex((project) => {
        return project.id === projectId // gives a specific project
    });

    if (_addProject__WEBPACK_IMPORTED_MODULE_1__.projects[projectIndex].title === todoPlace) {
        
        _addProject__WEBPACK_IMPORTED_MODULE_1__.projects[projectIndex].tasks.forEach((task) => {
            _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.appendChild((0,_inboxDOM__WEBPACK_IMPORTED_MODULE_2__.generateTodoDOM)(task))
        });
    }
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
                date: date.value,
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
    const dateDue = document.createElement('p');

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
            console.log(project.id, todo.placeTodo);
            (0,_inbox_js__WEBPACK_IMPORTED_MODULE_0__.deleteTodo)(todo.id, project.id); // this works. It deletes the correct todo.
            saveToLocalStorage('projects', _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects);
            if (project.title === todo.placeTodo) {
                (0,_addProjectDOM_js__WEBPACK_IMPORTED_MODULE_2__.render)(project.id, todo.placeTodo);
            }
            
        });
    });

    dateDue.textContent = `Due by ${todo.date}`
    individualTodoContainer.appendChild(dateDue);
    dateDue.classList.add('todo-el');

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/addProject.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9zLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL3RvZG9zLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL3RvZG9zLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL3NyYy9hZGRQcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG9zLy4vc3JjL2FkZFByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9zcmMvaW5ib3guanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9zcmMvaW5ib3hET00uanMiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJpbXBvcnQgeyB0b2dnbGVJbmJveFBvcHVwLCBnZXRTYXZlZFN0b3JhZ2UgfSBmcm9tIFwiLi9pbmJveFwiO1xyXG5pbXBvcnQgeyByZW5kZXJQcm9qZWN0cyB9IGZyb20gXCIuL2FkZFByb2plY3RET01cIjtcclxuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdE5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFkZC1wcm9qZWN0LW5hdi1idG5dJyk7XHJcbmNvbnN0IGNhbmNlbFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYW5jZWwtcHJvamVjdC1idG5dJyk7XHJcbmV4cG9ydCBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dC1wcm9qZWN0LXRpdGxlXScpO1xyXG5cclxuZXhwb3J0IGxldCBwcm9qZWN0cyA9IGdldFNhdmVkU3RvcmFnZSgncHJvamVjdHMnKTtcclxuXHJcbnJlbmRlclByb2plY3RzKHByb2plY3RzKTtcclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHByb2plY3RzXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0cygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlUHJvamVjdCgpIHtcclxuICAgICAgICAgICAgcHJvamVjdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogcHJvamVjdElucHV0LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgdGFza3M6IFtdLFxyXG4gICAgICAgICAgICAgICAgaWQ6IHV1aWR2NCgpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFkZFByb2plY3ROYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgdG9nZ2xlSW5ib3hQb3B1cCgnW2RhdGEtYWRkLXByb2plY3QtcG9wdXBdJywgYWRkUHJvamVjdE5hdkJ0bik7XHJcbn0pO1xyXG5cclxuY2FuY2VsUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICB0b2dnbGVJbmJveFBvcHVwKCdbZGF0YS1hZGQtcHJvamVjdC1wb3B1cF0nLCBhZGRQcm9qZWN0TmF2QnRuKTtcclxufSk7IiwiaW1wb3J0IHsgZGVsZXRlSXRlbSwgZGVsZXRlVG9kbywgVG9kb3MgfSBmcm9tIFwiLi9pbmJveFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuL2FkZFByb2plY3RcIjtcclxuaW1wb3J0IHsgc2F2ZVRvTG9jYWxTdG9yYWdlLCBpbmJveFRpdGxlLCB0b2Rvc0NvbnRhaW5lciwgZ2VuZXJhdGVUb2RvRE9NIH0gZnJvbSBcIi4vaW5ib3hET01cIjtcclxuXHJcbmV4cG9ydCBsZXQgaW5jb21wbGV0ZVRvZG9zID0gW107IC8vIG5vdyBhIGdsb2JhbCB2YXJpYWJsZS5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVByb2plY3RET00ocHJvamVjdCkge1xyXG4gICAgY29uc3QgaW5kaXZpZHVhbFByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHByb2plY3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJywgJ3Nob3ctZGlzcGxheS1mbGV4JywgJ2p1c3RpZnktY29udGVudC1zcGFjZS1iZXR3ZWVuJyk7XHJcblxyXG4gICAgcHJvamVjdEVsLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RFbCk7XHJcbiAgICBwcm9qZWN0RWwuY2xhc3NMaXN0LmFkZCgnZW50ZXItcHJvamVjdC1idXR0b24nKTtcclxuICAgIHByb2plY3RFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgLy8gc2F2ZVRvTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycsIHByb2plY3RzKTsgLy8ganVzdCBhZGRlZFxyXG4gICAgICAgIHRvZG9zQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgcHVzaFRvZG9zKHByb2plY3RzKTtcclxuICAgICAgICBpbmJveFRpdGxlLnRleHRDb250ZW50ID0gZS5zcmNFbGVtZW50LnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICBjb25zdCBzcGVjaWZpY1RvZG9zID0gaW5jb21wbGV0ZVRvZG9zLmZpbHRlcigodG9kbykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5zcmNFbGVtZW50LnRleHRDb250ZW50ID09PSB0b2RvLnBsYWNlVG9kbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvZG8udGl0bGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzcGVjaWZpY1RvZG9zLmZpbHRlcigodG9kbykgPT4ge1xyXG4gICAgICAgICAgICByZW5kZXIocHJvamVjdC5pZCwgdG9kby5wbGFjZVRvZG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdYJztcclxuICAgIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pO1xyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtcHJvamVjdC1idG4nKTtcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIHRvZG9zQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGluYm94VGl0bGUuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZGVsZXRlSXRlbShwcm9qZWN0LmlkLCBwcm9qZWN0cyk7XHJcbiAgICAgICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycsIHByb2plY3RzKTtcclxuICAgICAgICByZW5kZXJQcm9qZWN0cyhwcm9qZWN0cywgcHJvamVjdHMudGl0bGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMocHJvamVjdHMpIHtcclxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvamVjdHMtY29udGFpbmVyXScpO1xyXG5cclxuICAgIHByb2plY3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGdlbmVyYXRlUHJvamVjdERPTShwcm9qZWN0KSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hUb2Rvcyhwcm9qZWN0cykge1xyXG4gICAgdG9kb3NDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBwcm9qZWN0cy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICBwcm9qZWN0c1tpXS50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmNvbXBsZXRlVG9kb3MuaW5jbHVkZXModGFzaykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluY29tcGxldGVUb2Rvcy5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihwcm9qZWN0SWQsIHRvZG9QbGFjZSkge1xyXG4gICAgdG9kb3NDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAvLyBuZWVkIHRvIG1hdGNoIHRoZSBwbGFjZVRvZG8gd2l0aCB0aGUgcHJvamVjdCB0aXRsZS4gSWYgdGhlcmUgaXMgYSBtYXRjaCB0aGVuIGRpc3BsYXkgdGhlIHByb2plY3QncyB0YXNrcy4gRG9uJ3Qgd2FudCB0byBsb29wLCB3YW50IHRvIHNwZWNpZmljYWxseSB0YXJnZXQgd2l0aCB0aGUgcGFyYW1zXHJcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwcm9qZWN0cy5maW5kSW5kZXgoKHByb2plY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkIC8vIGdpdmVzIGEgc3BlY2lmaWMgcHJvamVjdFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHByb2plY3RzW3Byb2plY3RJbmRleF0udGl0bGUgPT09IHRvZG9QbGFjZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb2plY3RzW3Byb2plY3RJbmRleF0udGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICB0b2Rvc0NvbnRhaW5lci5hcHBlbmRDaGlsZChnZW5lcmF0ZVRvZG9ET00odGFzaykpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcclxuaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tICcuL2FkZFByb2plY3QnO1xyXG5pbXBvcnQgeyBpbmNvbXBsZXRlVG9kb3MgfSBmcm9tICcuL2FkZFByb2plY3RET00nO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdG8tYWRkLXRleHQnKTtcclxuZXhwb3J0IGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJpb3JpdHldJyk7XHJcbmV4cG9ydCBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZGF0ZV0nKTtcclxuZXhwb3J0IGNvbnN0IHBsYWNlVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsYWNlLXRvZG9dJykgLy8ganVzdCBhZGRlZFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUl0ZW0oaWQsIGFycmF5KSB7XHJcbiAgICBjb25zdCBpdGVtSW5kZXggPSBhcnJheS5maW5kSW5kZXgoKHRvZG8pID0+IHtcclxuICAgICAgICByZXR1cm4gdG9kby5pZCA9PT0gaWQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaXRlbUluZGV4ID4gLTEpIHtcclxuICAgICAgICBhcnJheS5zcGxpY2UoaXRlbUluZGV4LCAxKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVRvZG8odG9kb0lkLCBwcm9qZWN0SWQpIHtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwcm9qZWN0cy5maW5kSW5kZXgoKHByb2plY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHRvZG9JbmRleCA9IHByb2plY3RzW3Byb2plY3RJbmRleF0udGFza3MuZmluZEluZGV4KCh0b2RvKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRvZG8uaWQgPT09IHRvZG9JZDtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpZiAodG9kb0luZGV4ID4gLTEpIHtcclxuICAgICAgICBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLnRhc2tzLnNwbGljZSh0b2RvSW5kZXgsIDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2F2ZWRTdG9yYWdlKHNhdmVkU3RvcmFnZSkge1xyXG4gICAgY29uc3QgdG9kb3NKU09OID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc2F2ZWRTdG9yYWdlKTtcclxuXHJcbiAgICBpZiAodG9kb3NKU09OICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodG9kb3NKU09OKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUluYm94UG9wdXAoZWxlbWVudCwgYnRuKSB7XHJcbiAgICBjb25zdCB0YXNrUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUtZGlzcGxheScpO1xyXG4gICAgdGFza1BvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctZGlzcGxheS1mbGV4Jyk7XHJcbn1cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb24gaW4gY2hhcmdlIG9mIGluYm94IHRvZG9zIGluY2x1ZGluZyBjcmVhdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gVG9kb3MoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZVRvZG8oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZVRvZG86IHBsYWNlVG9kby52YWx1ZSwgLy8ganVzdCBhZGRlZFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LnZhbHVlLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgICAgICBpZDogdXVpZHY0KCksXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogZGF0ZS52YWx1ZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZGVsZXRlVG9kbywgcGxhY2VUb2RvLCBnZXRTYXZlZFN0b3JhZ2UgfSBmcm9tICcuL2luYm94LmpzJztcclxuaW1wb3J0IHsgcHJvamVjdHMsIHByb2plY3RJbnB1dCB9IGZyb20gJy4vYWRkUHJvamVjdC5qcyc7XHJcbmltcG9ydCB7IGluY29tcGxldGVUb2RvcywgcHVzaFRvZG9zLCByZW5kZXIgfSBmcm9tICcuL2FkZFByb2plY3RET00uanMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvZG9zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG9zLWRpc3BsYXktY29udGFpbmVyJyk7XHJcbmV4cG9ydCBjb25zdCBpbmJveFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvamVjdC10aXRsZS10ZXh0XScpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHN0cmluZ2lmeVZhcikge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShzdHJpbmdpZnlWYXIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlVG9kb0RPTSh0b2RvKSB7XHJcbiAgICBjb25zdCBpbmRpdmlkdWFsVG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgdG9kb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgY29uc3QgbWFya0NvbXBsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBjb25zdCBkYXRlRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cclxuICAgIHRvZG9FbC50ZXh0Q29udGVudCA9IGAke3RvZG8udGl0bGV9IFByaW9yaXR5OiAke3RvZG8ucHJpb3JpdHl9YDsgXHJcbiAgICB0b2RvRWwuY2xhc3NMaXN0LmFkZCgndG9kby1lbCcpO1xyXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09ICdoaWdoJykge1xyXG4gICAgICAgIHRvZG9FbC5jbGFzc0xpc3QuYWRkKCdyZWQnKVxyXG4gICAgfVxyXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09ICdtZWRpdW0nKSB7XHJcbiAgICAgICAgdG9kb0VsLmNsYXNzTGlzdC5hZGQoJ3llbGxvdycpXHJcbiAgICB9XHJcbiAgICBpZiAodG9kby5wcmlvcml0eSA9PT0gJ2xvdycpIHtcclxuICAgICAgICAgICAgdG9kb0VsLmNsYXNzTGlzdC5hZGQoJ2dyZWVuJylcclxuICAgIH1cclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9FbCk7XHJcblxyXG4gICAgY29tcGxldGVkVGV4dC50ZXh0Q29udGVudCA9ICdDb21wbGV0ZWQ/JztcclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXBsZXRlZFRleHQpO1xyXG5cclxuICAgIC8vIHNldCB1cCB0b2RvIGNoZWNrYm94XHJcbiAgICBtYXJrQ29tcGxldGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbiAgICBtYXJrQ29tcGxldGUuY2xhc3NMaXN0LmFkZCgnbWFyay1jb21wbGV0ZScpO1xyXG4gICAgaW5kaXZpZHVhbFRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQobWFya0NvbXBsZXRlKTtcclxuICAgIG1hcmtDb21wbGV0ZS5jaGVja2VkID0gdG9kby5jb21wbGV0ZWQ7XHJcbiAgICBtYXJrQ29tcGxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICBwdXNoVG9kb3MocHJvamVjdHMpO1xyXG5cclxuICAgICAgICBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdC5pZCwgdG9kby5wbGFjZVRvZG8pO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvKHRvZG8uaWQsIHByb2plY3QuaWQpOyAvLyB0aGlzIHdvcmtzLiBJdCBkZWxldGVzIHRoZSBjb3JyZWN0IHRvZG8uXHJcbiAgICAgICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgncHJvamVjdHMnLCBwcm9qZWN0cyk7XHJcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LnRpdGxlID09PSB0b2RvLnBsYWNlVG9kbykge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyKHByb2plY3QuaWQsIHRvZG8ucGxhY2VUb2RvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGVEdWUudGV4dENvbnRlbnQgPSBgRHVlIGJ5ICR7dG9kby5kYXRlfWBcclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGRhdGVEdWUpO1xyXG4gICAgZGF0ZUR1ZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWVsJyk7XHJcblxyXG4gICAgcmV0dXJuIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyO1xyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hZGRQcm9qZWN0LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9