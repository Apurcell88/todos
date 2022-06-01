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

function render(projects) {
    // todosContainer.textContent = '';

    const specificTodos = incompleteTodos.filter((todo) => {
        // need the correct project todos to display
        // how do we target the correct project todos?
        projects.find((project) => {
            if (project.title === todo.placeTodo) {
                console.log(todo.placeTodo);
                // console.log(project.title);
                return todo.title
            }
        })
    });
    console.log(incompleteTodos);
    console.log(specificTodos); // returning as empty array, why?

    specificTodos.forEach((todo) => {
        _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.appendChild((0,_inboxDOM__WEBPACK_IMPORTED_MODULE_2__.generateTodoDOM)(todo));
    });
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
    console.log(todoIndex);
    
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
        _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects.forEach((project) => {
            // inboxTitle.textContent = project.title;
            (0,_addProjectDOM_js__WEBPACK_IMPORTED_MODULE_2__.pushTodos)(_addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects);
        });

        _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects.filter((project) => {
            (0,_inbox_js__WEBPACK_IMPORTED_MODULE_0__.deleteTodo)(todo.id, project.id); // this works. It deletes the correct todo. Have to update the screen to reflect the change live instead of on refresh
            // console.log(incompleteTodos);
            saveToLocalStorage('projects', _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects);
        });
        (0,_addProjectDOM_js__WEBPACK_IMPORTED_MODULE_2__.render)(_addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/addProject.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2Rvcy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL3RvZG9zLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9zcmMvYWRkUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL3NyYy9hZGRQcm9qZWN0RE9NLmpzIiwid2VicGFjazovL3RvZG9zLy4vc3JjL2luYm94LmpzIiwid2VicGFjazovL3RvZG9zLy4vc3JjL2luYm94RE9NLmpzIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi4gQWxzbyxcbiAgICAvLyBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gKG1zQ3J5cHRvKSBvbiBJRTExLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHsgdG9nZ2xlSW5ib3hQb3B1cCwgZ2V0U2F2ZWRTdG9yYWdlIH0gZnJvbSBcIi4vaW5ib3hcIjtcclxuaW1wb3J0IHsgcmVuZGVyUHJvamVjdHMgfSBmcm9tIFwiLi9hZGRQcm9qZWN0RE9NXCI7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFByb2plY3ROYXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hZGQtcHJvamVjdC1uYXYtYnRuXScpO1xyXG5jb25zdCBjYW5jZWxQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2FuY2VsLXByb2plY3QtYnRuXScpO1xyXG5leHBvcnQgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQtcHJvamVjdC10aXRsZV0nKTtcclxuXHJcbmV4cG9ydCBsZXQgcHJvamVjdHMgPSBnZXRTYXZlZFN0b3JhZ2UoJ3Byb2plY3RzJyk7XHJcblxyXG5yZW5kZXJQcm9qZWN0cyhwcm9qZWN0cyk7XHJcblxyXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBwcm9qZWN0c1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvamVjdHMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZVByb2plY3QoKSB7XHJcbiAgICAgICAgICAgIHByb2plY3RzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHByb2plY3RJbnB1dC52YWx1ZSxcclxuICAgICAgICAgICAgICAgIHRhc2tzOiBbXSwgLy8gd2FudCB0aGUgdG9kb3MgaW4gaGVyZVxyXG4gICAgICAgICAgICAgICAgaWQ6IHV1aWR2NCgpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFkZFByb2plY3ROYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgdG9nZ2xlSW5ib3hQb3B1cCgnW2RhdGEtYWRkLXByb2plY3QtcG9wdXBdJywgYWRkUHJvamVjdE5hdkJ0bik7XHJcbn0pO1xyXG5cclxuY2FuY2VsUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICB0b2dnbGVJbmJveFBvcHVwKCdbZGF0YS1hZGQtcHJvamVjdC1wb3B1cF0nLCBhZGRQcm9qZWN0TmF2QnRuKTtcclxufSk7IiwiaW1wb3J0IHsgZGVsZXRlSXRlbSwgVG9kb3MgfSBmcm9tIFwiLi9pbmJveFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuL2FkZFByb2plY3RcIjtcclxuaW1wb3J0IHsgc2F2ZVRvTG9jYWxTdG9yYWdlLCBpbmJveFRpdGxlLCB0b2Rvc0NvbnRhaW5lciwgZ2VuZXJhdGVUb2RvRE9NIH0gZnJvbSBcIi4vaW5ib3hET01cIjtcclxuXHJcbmV4cG9ydCBsZXQgaW5jb21wbGV0ZVRvZG9zID0gW107IC8vIG5vdyBhIGdsb2JhbCB2YXJpYWJsZS5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVByb2plY3RET00ocHJvamVjdCkge1xyXG4gICAgY29uc3QgaW5kaXZpZHVhbFByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHByb2plY3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJywgJ3Nob3ctZGlzcGxheS1mbGV4JywgJ2p1c3RpZnktY29udGVudC1zcGFjZS1iZXR3ZWVuJyk7XHJcblxyXG4gICAgcHJvamVjdEVsLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RFbCk7XHJcbiAgICBwcm9qZWN0RWwuY2xhc3NMaXN0LmFkZCgnZW50ZXItcHJvamVjdC1idXR0b24nKTtcclxuICAgIC8vIGJlbG93IGlzIG1vcmUgdGhhbiBsaWtlbHkgd3JvbmcsIGJ1dCB3ZSBjYW4gYXQgbGVhc3Qgc2VlIHNvbWUgZnVuY3Rpb25hbGl0eVxyXG4gICAgcHJvamVjdEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAvLyBzYXZlVG9Mb2NhbFN0b3JhZ2UoJ3Byb2plY3RzJywgcHJvamVjdHMpOyAvLyBqdXN0IGFkZGVkXHJcbiAgICAgICAgdG9kb3NDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICBwdXNoVG9kb3MocHJvamVjdHMpO1xyXG4gICAgICAgIGluYm94VGl0bGUudGV4dENvbnRlbnQgPSBlLnNyY0VsZW1lbnQudGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGNvbnN0IHNwZWNpZmljVG9kb3MgPSBpbmNvbXBsZXRlVG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnNyY0VsZW1lbnQudGV4dENvbnRlbnQgPT09IHRvZG8ucGxhY2VUb2RvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9kby50aXRsZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNwZWNpZmljVG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xyXG4gICAgICAgICAgICB0b2Rvc0NvbnRhaW5lci5hcHBlbmRDaGlsZChnZW5lcmF0ZVRvZG9ET00odG9kbykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdYJztcclxuICAgIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pO1xyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtcHJvamVjdC1idG4nKTtcclxuICAgIGRlbGV0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIHRvZG9zQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGluYm94VGl0bGUuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZGVsZXRlSXRlbShwcm9qZWN0LmlkLCBwcm9qZWN0cyk7XHJcbiAgICAgICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycsIHByb2plY3RzKTtcclxuICAgICAgICByZW5kZXJQcm9qZWN0cyhwcm9qZWN0cywgcHJvamVjdHMudGl0bGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMocHJvamVjdHMpIHtcclxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvamVjdHMtY29udGFpbmVyXScpO1xyXG5cclxuICAgIHByb2plY3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGdlbmVyYXRlUHJvamVjdERPTShwcm9qZWN0KSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hUb2Rvcyhwcm9qZWN0cykge1xyXG4gICAgdG9kb3NDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBwcm9qZWN0cy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICBwcm9qZWN0c1tpXS50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmNvbXBsZXRlVG9kb3MuaW5jbHVkZXModGFzaykpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0YXNrIGFscmVhZHkgaW4gYXJyYXknKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5jb21wbGV0ZVRvZG9zLnB1c2godGFzayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHByb2plY3RzKSB7XHJcbiAgICAvLyB0b2Rvc0NvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xyXG5cclxuICAgIGNvbnN0IHNwZWNpZmljVG9kb3MgPSBpbmNvbXBsZXRlVG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB7XHJcbiAgICAgICAgLy8gbmVlZCB0aGUgY29ycmVjdCBwcm9qZWN0IHRvZG9zIHRvIGRpc3BsYXlcclxuICAgICAgICAvLyBob3cgZG8gd2UgdGFyZ2V0IHRoZSBjb3JyZWN0IHByb2plY3QgdG9kb3M/XHJcbiAgICAgICAgcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJvamVjdC50aXRsZSA9PT0gdG9kby5wbGFjZVRvZG8pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvZG8ucGxhY2VUb2RvKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3QudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvZG8udGl0bGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKGluY29tcGxldGVUb2Rvcyk7XHJcbiAgICBjb25zb2xlLmxvZyhzcGVjaWZpY1RvZG9zKTsgLy8gcmV0dXJuaW5nIGFzIGVtcHR5IGFycmF5LCB3aHk/XHJcblxyXG4gICAgc3BlY2lmaWNUb2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XHJcbiAgICAgICAgdG9kb3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVUb2RvRE9NKHRvZG8pKTtcclxuICAgIH0pO1xyXG59IiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XHJcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9hZGRQcm9qZWN0JztcclxuaW1wb3J0IHsgaW5jb21wbGV0ZVRvZG9zIH0gZnJvbSAnLi9hZGRQcm9qZWN0RE9NJztcclxuXHJcbmV4cG9ydCBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXRvLWFkZC10ZXh0Jyk7XHJcbmV4cG9ydCBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaW9yaXR5XScpO1xyXG5leHBvcnQgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRhdGVdJyk7XHJcbmV4cG9ydCBjb25zdCBwbGFjZVRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wbGFjZS10b2RvXScpIC8vIGp1c3QgYWRkZWRcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVJdGVtKGlkLCBhcnJheSkge1xyXG4gICAgY29uc3QgaXRlbUluZGV4ID0gYXJyYXkuZmluZEluZGV4KCh0b2RvKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRvZG8uaWQgPT09IGlkO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGl0ZW1JbmRleCA+IC0xKSB7XHJcbiAgICAgICAgYXJyYXkuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVUb2RvKHRvZG9JZCwgcHJvamVjdElkKSB7XHJcblxyXG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHByb2plY3QuaWQgPT09IHByb2plY3RJZFxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLnRhc2tzLmZpbmRJbmRleCgodG9kbykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0b2RvLmlkID09PSB0b2RvSWQ7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHRvZG9JbmRleCk7XHJcbiAgICBcclxuICAgIGlmICh0b2RvSW5kZXggPiAtMSkge1xyXG4gICAgICAgIHByb2plY3RzW3Byb2plY3RJbmRleF0udGFza3Muc3BsaWNlKHRvZG9JbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTYXZlZFN0b3JhZ2Uoc2F2ZWRTdG9yYWdlKSB7XHJcbiAgICBjb25zdCB0b2Rvc0pTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzYXZlZFN0b3JhZ2UpO1xyXG5cclxuICAgIGlmICh0b2Rvc0pTT04gIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0b2Rvc0pTT04pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlSW5ib3hQb3B1cChlbGVtZW50LCBidG4pIHtcclxuICAgIGNvbnN0IHRhc2tQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XHJcbiAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZS1kaXNwbGF5Jyk7XHJcbiAgICB0YXNrUG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1kaXNwbGF5LWZsZXgnKTtcclxufVxyXG5cclxuLy8gRmFjdG9yeSBmdW5jdGlvbiBpbiBjaGFyZ2Ugb2YgaW5ib3ggdG9kb3MgaW5jbHVkaW5nIGNyZWF0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBUb2RvcygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlVG9kbygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBsYWNlVG9kbzogcGxhY2VUb2RvLnZhbHVlLCAvLyBqdXN0IGFkZGVkXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHkudmFsdWUudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgICAgIGlkOiB1dWlkdjQoKSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBkYXRlOiBkYXRlLnZhbHVlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBkZWxldGVUb2RvLCBnZXRTYXZlZFN0b3JhZ2UgfSBmcm9tICcuL2luYm94LmpzJztcclxuaW1wb3J0IHsgcHJvamVjdHMsIHByb2plY3RJbnB1dCB9IGZyb20gJy4vYWRkUHJvamVjdC5qcyc7XHJcbmltcG9ydCB7IGluY29tcGxldGVUb2RvcywgcHVzaFRvZG9zLCByZW5kZXIgfSBmcm9tICcuL2FkZFByb2plY3RET00uanMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvZG9zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG9zLWRpc3BsYXktY29udGFpbmVyJyk7XHJcbmV4cG9ydCBjb25zdCBpbmJveFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvamVjdC10aXRsZS10ZXh0XScpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHN0cmluZ2lmeVZhcikge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShzdHJpbmdpZnlWYXIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlVG9kb0RPTSh0b2RvKSB7XHJcbiAgICBjb25zdCBpbmRpdmlkdWFsVG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgdG9kb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgY29uc3QgbWFya0NvbXBsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAvLyBjb25zdCBkYXRlRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cclxuICAgIHRvZG9FbC50ZXh0Q29udGVudCA9IGAke3RvZG8udGl0bGV9IFByaW9yaXR5OiAke3RvZG8ucHJpb3JpdHl9YDsgXHJcbiAgICB0b2RvRWwuY2xhc3NMaXN0LmFkZCgndG9kby1lbCcpO1xyXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09ICdoaWdoJykge1xyXG4gICAgICAgIHRvZG9FbC5jbGFzc0xpc3QuYWRkKCdyZWQnKVxyXG4gICAgfVxyXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09ICdtZWRpdW0nKSB7XHJcbiAgICAgICAgdG9kb0VsLmNsYXNzTGlzdC5hZGQoJ3llbGxvdycpXHJcbiAgICB9XHJcbiAgICBpZiAodG9kby5wcmlvcml0eSA9PT0gJ2xvdycpIHtcclxuICAgICAgICAgICAgdG9kb0VsLmNsYXNzTGlzdC5hZGQoJ2dyZWVuJylcclxuICAgIH1cclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9FbCk7XHJcblxyXG4gICAgY29tcGxldGVkVGV4dC50ZXh0Q29udGVudCA9ICdDb21wbGV0ZWQ/JztcclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXBsZXRlZFRleHQpO1xyXG5cclxuICAgIC8vIHNldCB1cCB0b2RvIGNoZWNrYm94XHJcbiAgICBtYXJrQ29tcGxldGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbiAgICBtYXJrQ29tcGxldGUuY2xhc3NMaXN0LmFkZCgnbWFyay1jb21wbGV0ZScpO1xyXG4gICAgaW5kaXZpZHVhbFRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQobWFya0NvbXBsZXRlKTtcclxuICAgIG1hcmtDb21wbGV0ZS5jaGVja2VkID0gdG9kby5jb21wbGV0ZWQ7XHJcbiAgICBtYXJrQ29tcGxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGluYm94VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgICAgICBwdXNoVG9kb3MocHJvamVjdHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlVG9kbyh0b2RvLmlkLCBwcm9qZWN0LmlkKTsgLy8gdGhpcyB3b3Jrcy4gSXQgZGVsZXRlcyB0aGUgY29ycmVjdCB0b2RvLiBIYXZlIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIHRvIHJlZmxlY3QgdGhlIGNoYW5nZSBsaXZlIGluc3RlYWQgb2Ygb24gcmVmcmVzaFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmNvbXBsZXRlVG9kb3MpO1xyXG4gICAgICAgICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoJ3Byb2plY3RzJywgcHJvamVjdHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlbmRlcihwcm9qZWN0cyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBkYXRlRHVlLnRleHRDb250ZW50ID0gYER1ZSBieSAke3RvZG8uZGF0ZX1gXHJcbiAgICAvLyBpbmRpdmlkdWFsVG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZChkYXRlRHVlKTtcclxuICAgIC8vIGRhdGVEdWUuY2xhc3NMaXN0LmFkZCgndG9kby1lbCcpO1xyXG5cclxuICAgIHJldHVybiBpbmRpdmlkdWFsVG9kb0NvbnRhaW5lcjtcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYWRkUHJvamVjdC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==