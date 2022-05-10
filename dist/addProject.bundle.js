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
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _inbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inbox */ "./src/inbox.js");
/* harmony import */ var _addProject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addProject */ "./src/addProject.js");
/* harmony import */ var _inboxDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inboxDOM */ "./src/inboxDOM.js");




let incompleteTodos = []; // now a global variable.
// let itemIndex;

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
        // console.log(e.srcElement.textContent)
        _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.textContent = '';
        render(_addProject__WEBPACK_IMPORTED_MODULE_1__.projects);
        _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.inboxTitle.textContent = project.title;

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
// export function render(todos) { // have to rework this to display proper todos for each project
//     todosContainer.innerHTML = '';

//     // let incompleteTodos = [];

    // for (let i = 0; i <= todos.length - 1; i++) {
    //     todos[i].tasks.forEach((task) => {
    //          incompleteTodos.push(task);
    //     });
    // }

    // incompleteTodos.forEach((todo) => {
    //     todosContainer.appendChild(generateTodoDOM(todo));
    // });
// };

function renderProjects(projects) {
    const projectsContainer = document.querySelector('[data-projects-container]');

    projectsContainer.innerHTML = '';
    projects.forEach((project) => {
        projectsContainer.appendChild(generateProjectDOM(project));
    });
}

function render(projects) {
    // incompleteTodos = []
    // const todo = Todos();
    _inboxDOM__WEBPACK_IMPORTED_MODULE_2__.todosContainer.innerHTML = '';

    // let incompleteTodos = []; // all of the todos get put here. Have to sort them into different projects. Need correlation between projects/project tasks. Todos go in the project.tasks

    for (let i = 0; i <= projects.length - 1; i++) {
        projects[i].tasks.forEach((task, index) => {
            // if (projects[i].tasks[index].includes(incompleteTodos)) {
            //     incompleteTodos.push(task);
            // }
            if (incompleteTodos.includes(task)) {
                console.log('task already in array')
            }
             else {
                incompleteTodos.push(task);
            }
             
        });
    }

    console.log(incompleteTodos)

    // project.tasks.push(todo.createTodo())
    // incompleteTodos.push(todo.createTodo)
    // saveToLocalStorage('projects', projects);

    // console.log(projects)
    // const specificTodos = incompleteTodos.filter((todo) => {
    //     return !projects.some((project) => {
    //         return todo.placeTodo === project.title
    //     });
    // })

    // console.log(specificTodos)

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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


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

function deleteTodo(todoId, projectId, projects) {
    // something going on with this function. Not working as intended. Come back after projects are displaying properly.
    let itemIndex = 0;

    projects.forEach((project) => {
        if (project.id === projectId) {
            itemIndex = project.tasks.findIndex((todo) => {
                return todo.id === todoId;
            });
        }
    });

    console.log(itemIndex);

    if (itemIndex > -1) {
        projects.forEach((project) => {
            project.tasks.splice(itemIndex, 1);
        })
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
                id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
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

    inboxTitle.textContent = _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projectInput.value;

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
        (0,_inbox_js__WEBPACK_IMPORTED_MODULE_0__.deleteTodo)(todo.id, _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects.id, _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects); // something going on with this function?
        saveToLocalStorage('projects', _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects);
        // render(projects);
        _addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects.forEach((project) => {
            inboxTitle.textContent = project.title;
            (0,_addProjectDOM_js__WEBPACK_IMPORTED_MODULE_2__.render)(_addProject_js__WEBPACK_IMPORTED_MODULE_1__.projects);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/addProject.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2Rvcy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL3RvZG9zLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9zcmMvYWRkUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2Rvcy8uL3NyYy9hZGRQcm9qZWN0RE9NLmpzIiwid2VicGFjazovL3RvZG9zLy4vc3JjL2luYm94LmpzIiwid2VicGFjazovL3RvZG9zLy4vc3JjL2luYm94RE9NLmpzIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kb3Mvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi4gQWxzbyxcbiAgICAvLyBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gKG1zQ3J5cHRvKSBvbiBJRTExLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHsgdG9nZ2xlSW5ib3hQb3B1cCwgZ2V0U2F2ZWRTdG9yYWdlIH0gZnJvbSBcIi4vaW5ib3hcIjtcclxuaW1wb3J0IHsgcmVuZGVyUHJvamVjdHMgfSBmcm9tIFwiLi9hZGRQcm9qZWN0RE9NXCI7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFByb2plY3ROYXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hZGQtcHJvamVjdC1uYXYtYnRuXScpO1xyXG5jb25zdCBjYW5jZWxQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2FuY2VsLXByb2plY3QtYnRuXScpO1xyXG5leHBvcnQgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQtcHJvamVjdC10aXRsZV0nKTtcclxuXHJcbmV4cG9ydCBsZXQgcHJvamVjdHMgPSBnZXRTYXZlZFN0b3JhZ2UoJ3Byb2plY3RzJyk7XHJcblxyXG5yZW5kZXJQcm9qZWN0cyhwcm9qZWN0cyk7XHJcblxyXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBwcm9qZWN0c1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvamVjdHMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZVByb2plY3QoKSB7XHJcbiAgICAgICAgICAgIHByb2plY3RzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHByb2plY3RJbnB1dC52YWx1ZSxcclxuICAgICAgICAgICAgICAgIHRhc2tzOiBbXSwgLy8gd2FudCB0aGUgdG9kb3MgaW4gaGVyZVxyXG4gICAgICAgICAgICAgICAgaWQ6IHV1aWR2NCgpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFkZFByb2plY3ROYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgdG9nZ2xlSW5ib3hQb3B1cCgnW2RhdGEtYWRkLXByb2plY3QtcG9wdXBdJywgYWRkUHJvamVjdE5hdkJ0bik7XHJcbn0pO1xyXG5cclxuY2FuY2VsUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICB0b2dnbGVJbmJveFBvcHVwKCdbZGF0YS1hZGQtcHJvamVjdC1wb3B1cF0nLCBhZGRQcm9qZWN0TmF2QnRuKTtcclxufSk7IiwiaW1wb3J0IHsgZGVsZXRlSXRlbSwgVG9kb3MgfSBmcm9tIFwiLi9pbmJveFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuL2FkZFByb2plY3RcIjtcclxuaW1wb3J0IHsgc2F2ZVRvTG9jYWxTdG9yYWdlLCBpbmJveFRpdGxlLCB0b2Rvc0NvbnRhaW5lciwgZ2VuZXJhdGVUb2RvRE9NIH0gZnJvbSBcIi4vaW5ib3hET01cIjtcclxuXHJcbmV4cG9ydCBsZXQgaW5jb21wbGV0ZVRvZG9zID0gW107IC8vIG5vdyBhIGdsb2JhbCB2YXJpYWJsZS5cclxuLy8gbGV0IGl0ZW1JbmRleDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVByb2plY3RET00ocHJvamVjdCkge1xyXG4gICAgY29uc3QgaW5kaXZpZHVhbFByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHByb2plY3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJywgJ3Nob3ctZGlzcGxheS1mbGV4JywgJ2p1c3RpZnktY29udGVudC1zcGFjZS1iZXR3ZWVuJyk7XHJcblxyXG4gICAgcHJvamVjdEVsLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgIGluZGl2aWR1YWxQcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RFbCk7XHJcbiAgICBwcm9qZWN0RWwuY2xhc3NMaXN0LmFkZCgnZW50ZXItcHJvamVjdC1idXR0b24nKTtcclxuICAgIC8vIGJlbG93IGlzIG1vcmUgdGhhbiBsaWtlbHkgd3JvbmcsIGJ1dCB3ZSBjYW4gYXQgbGVhc3Qgc2VlIHNvbWUgZnVuY3Rpb25hbGl0eVxyXG4gICAgcHJvamVjdEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAvLyBzYXZlVG9Mb2NhbFN0b3JhZ2UoJ3Byb2plY3RzJywgcHJvamVjdHMpOyAvLyBqdXN0IGFkZGVkXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS5zcmNFbGVtZW50LnRleHRDb250ZW50KVxyXG4gICAgICAgIHRvZG9zQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgcmVuZGVyKHByb2plY3RzKTtcclxuICAgICAgICBpbmJveFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3BlY2lmaWNUb2RvcyA9IGluY29tcGxldGVUb2Rvcy5maWx0ZXIoKHRvZG8pID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuc3JjRWxlbWVudC50ZXh0Q29udGVudCA9PT0gdG9kby5wbGFjZVRvZG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2RvLnRpdGxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3BlY2lmaWNUb2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XHJcbiAgICAgICAgICAgIHRvZG9zQ29udGFpbmVyLmFwcGVuZENoaWxkKGdlbmVyYXRlVG9kb0RPTSh0b2RvKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gICAgaW5kaXZpZHVhbFByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bik7XHJcbiAgICBkZWxldGVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1wcm9qZWN0LWJ0bicpO1xyXG4gICAgZGVsZXRlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgdG9kb3NDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgaW5ib3hUaXRsZS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBkZWxldGVJdGVtKHByb2plY3QuaWQsIHByb2plY3RzKTtcclxuICAgICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoJ3Byb2plY3RzJywgcHJvamVjdHMpO1xyXG4gICAgICAgIHJlbmRlclByb2plY3RzKHByb2plY3RzLCBwcm9qZWN0cy50aXRsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaW5kaXZpZHVhbFByb2plY3RDb250YWluZXI7XHJcbn1cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcih0b2RvcykgeyAvLyBoYXZlIHRvIHJld29yayB0aGlzIHRvIGRpc3BsYXkgcHJvcGVyIHRvZG9zIGZvciBlYWNoIHByb2plY3RcclxuLy8gICAgIHRvZG9zQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG5cclxuLy8gICAgIC8vIGxldCBpbmNvbXBsZXRlVG9kb3MgPSBbXTtcclxuXHJcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8PSB0b2Rvcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgIC8vICAgICB0b2Rvc1tpXS50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICBpbmNvbXBsZXRlVG9kb3MucHVzaCh0YXNrKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBpbmNvbXBsZXRlVG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xyXG4gICAgLy8gICAgIHRvZG9zQ29udGFpbmVyLmFwcGVuZENoaWxkKGdlbmVyYXRlVG9kb0RPTSh0b2RvKSk7XHJcbiAgICAvLyB9KTtcclxuLy8gfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJQcm9qZWN0cyhwcm9qZWN0cykge1xyXG4gICAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9qZWN0cy1jb250YWluZXJdJyk7XHJcblxyXG4gICAgcHJvamVjdHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVQcm9qZWN0RE9NKHByb2plY3QpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHByb2plY3RzKSB7XHJcbiAgICAvLyBpbmNvbXBsZXRlVG9kb3MgPSBbXVxyXG4gICAgLy8gY29uc3QgdG9kbyA9IFRvZG9zKCk7XHJcbiAgICB0b2Rvc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAvLyBsZXQgaW5jb21wbGV0ZVRvZG9zID0gW107IC8vIGFsbCBvZiB0aGUgdG9kb3MgZ2V0IHB1dCBoZXJlLiBIYXZlIHRvIHNvcnQgdGhlbSBpbnRvIGRpZmZlcmVudCBwcm9qZWN0cy4gTmVlZCBjb3JyZWxhdGlvbiBiZXR3ZWVuIHByb2plY3RzL3Byb2plY3QgdGFza3MuIFRvZG9zIGdvIGluIHRoZSBwcm9qZWN0LnRhc2tzXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcHJvamVjdHMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgcHJvamVjdHNbaV0udGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy8gaWYgKHByb2plY3RzW2ldLnRhc2tzW2luZGV4XS5pbmNsdWRlcyhpbmNvbXBsZXRlVG9kb3MpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBpbmNvbXBsZXRlVG9kb3MucHVzaCh0YXNrKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZiAoaW5jb21wbGV0ZVRvZG9zLmluY2x1ZGVzKHRhc2spKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGFzayBhbHJlYWR5IGluIGFycmF5JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmNvbXBsZXRlVG9kb3MucHVzaCh0YXNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coaW5jb21wbGV0ZVRvZG9zKVxyXG5cclxuICAgIC8vIHByb2plY3QudGFza3MucHVzaCh0b2RvLmNyZWF0ZVRvZG8oKSlcclxuICAgIC8vIGluY29tcGxldGVUb2Rvcy5wdXNoKHRvZG8uY3JlYXRlVG9kbylcclxuICAgIC8vIHNhdmVUb0xvY2FsU3RvcmFnZSgncHJvamVjdHMnLCBwcm9qZWN0cyk7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdHMpXHJcbiAgICAvLyBjb25zdCBzcGVjaWZpY1RvZG9zID0gaW5jb21wbGV0ZVRvZG9zLmZpbHRlcigodG9kbykgPT4ge1xyXG4gICAgLy8gICAgIHJldHVybiAhcHJvamVjdHMuc29tZSgocHJvamVjdCkgPT4ge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gdG9kby5wbGFjZVRvZG8gPT09IHByb2plY3QudGl0bGVcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0pXHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coc3BlY2lmaWNUb2RvcylcclxuXHJcbiAgICAvLyBzcGVjaWZpY1RvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcclxuICAgIC8vICAgICB0b2Rvc0NvbnRhaW5lci5hcHBlbmRDaGlsZChnZW5lcmF0ZVRvZG9ET00odG9kbykpO1xyXG4gICAgLy8gfSk7XHJcbn0iLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcclxuXHJcbmV4cG9ydCBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXRvLWFkZC10ZXh0Jyk7XHJcbmV4cG9ydCBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaW9yaXR5XScpO1xyXG5leHBvcnQgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRhdGVdJyk7XHJcbmV4cG9ydCBjb25zdCBwbGFjZVRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wbGFjZS10b2RvXScpIC8vIGp1c3QgYWRkZWRcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVJdGVtKGlkLCBhcnJheSkge1xyXG4gICAgY29uc3QgaXRlbUluZGV4ID0gYXJyYXkuZmluZEluZGV4KCh0b2RvKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRvZG8uaWQgPT09IGlkO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGl0ZW1JbmRleCA+IC0xKSB7XHJcbiAgICAgICAgYXJyYXkuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVUb2RvKHRvZG9JZCwgcHJvamVjdElkLCBwcm9qZWN0cykge1xyXG4gICAgLy8gc29tZXRoaW5nIGdvaW5nIG9uIHdpdGggdGhpcyBmdW5jdGlvbi4gTm90IHdvcmtpbmcgYXMgaW50ZW5kZWQuIENvbWUgYmFjayBhZnRlciBwcm9qZWN0cyBhcmUgZGlzcGxheWluZyBwcm9wZXJseS5cclxuICAgIGxldCBpdGVtSW5kZXggPSAwO1xyXG5cclxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICBpZiAocHJvamVjdC5pZCA9PT0gcHJvamVjdElkKSB7XHJcbiAgICAgICAgICAgIGl0ZW1JbmRleCA9IHByb2plY3QudGFza3MuZmluZEluZGV4KCh0b2RvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9kby5pZCA9PT0gdG9kb0lkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhpdGVtSW5kZXgpO1xyXG5cclxuICAgIGlmIChpdGVtSW5kZXggPiAtMSkge1xyXG4gICAgICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgcHJvamVjdC50YXNrcy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2F2ZWRTdG9yYWdlKHNhdmVkU3RvcmFnZSkge1xyXG4gICAgY29uc3QgdG9kb3NKU09OID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc2F2ZWRTdG9yYWdlKTtcclxuXHJcbiAgICBpZiAodG9kb3NKU09OICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodG9kb3NKU09OKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUluYm94UG9wdXAoZWxlbWVudCwgYnRuKSB7XHJcbiAgICBjb25zdCB0YXNrUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUtZGlzcGxheScpO1xyXG4gICAgdGFza1BvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctZGlzcGxheS1mbGV4Jyk7XHJcbn1cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb24gaW4gY2hhcmdlIG9mIGluYm94IHRvZG9zIGluY2x1ZGluZyBjcmVhdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gVG9kb3MoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZVRvZG8oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZVRvZG86IHBsYWNlVG9kby52YWx1ZSwgLy8ganVzdCBhZGRlZFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LnZhbHVlLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgICAgICBpZDogdXVpZHY0KCksXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gZGF0ZTogZGF0ZS52YWx1ZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZGVsZXRlVG9kbyB9IGZyb20gJy4vaW5ib3guanMnO1xyXG5pbXBvcnQgeyBwcm9qZWN0cywgcHJvamVjdElucHV0IH0gZnJvbSAnLi9hZGRQcm9qZWN0LmpzJztcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9hZGRQcm9qZWN0RE9NLmpzJztcclxuXHJcbmV4cG9ydCBjb25zdCB0b2Rvc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2Rvcy1kaXNwbGF5LWNvbnRhaW5lcicpO1xyXG5leHBvcnQgY29uc3QgaW5ib3hUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2plY3QtdGl0bGUtdGV4dF0nKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlVG9Mb2NhbFN0b3JhZ2Uoa2V5LCBzdHJpbmdpZnlWYXIpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoc3RyaW5naWZ5VmFyKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVRvZG9ET00odG9kbykge1xyXG4gICAgY29uc3QgaW5kaXZpZHVhbFRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHRvZG9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGNvbnN0IG1hcmtDb21wbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgLy8gY29uc3QgZGF0ZUR1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHJcbiAgICBpbmJveFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdElucHV0LnZhbHVlO1xyXG5cclxuICAgIHRvZG9FbC50ZXh0Q29udGVudCA9IGAke3RvZG8udGl0bGV9IFByaW9yaXR5OiAke3RvZG8ucHJpb3JpdHl9YDsgXHJcbiAgICB0b2RvRWwuY2xhc3NMaXN0LmFkZCgndG9kby1lbCcpO1xyXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09ICdoaWdoJykge1xyXG4gICAgICAgIHRvZG9FbC5jbGFzc0xpc3QuYWRkKCdyZWQnKVxyXG4gICAgfVxyXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09ICdtZWRpdW0nKSB7XHJcbiAgICAgICAgdG9kb0VsLmNsYXNzTGlzdC5hZGQoJ3llbGxvdycpXHJcbiAgICB9XHJcbiAgICBpZiAodG9kby5wcmlvcml0eSA9PT0gJ2xvdycpIHtcclxuICAgICAgICAgICAgdG9kb0VsLmNsYXNzTGlzdC5hZGQoJ2dyZWVuJylcclxuICAgIH1cclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9FbCk7XHJcblxyXG4gICAgY29tcGxldGVkVGV4dC50ZXh0Q29udGVudCA9ICdDb21wbGV0ZWQ/JztcclxuICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXBsZXRlZFRleHQpO1xyXG5cclxuICAgIC8vIHNldCB1cCB0b2RvIGNoZWNrYm94XHJcbiAgICBtYXJrQ29tcGxldGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XHJcbiAgICBtYXJrQ29tcGxldGUuY2xhc3NMaXN0LmFkZCgnbWFyay1jb21wbGV0ZScpO1xyXG4gICAgaW5kaXZpZHVhbFRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQobWFya0NvbXBsZXRlKTtcclxuICAgIG1hcmtDb21wbGV0ZS5jaGVja2VkID0gdG9kby5jb21wbGV0ZWQ7XHJcbiAgICBtYXJrQ29tcGxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICBkZWxldGVUb2RvKHRvZG8uaWQsIHByb2plY3RzLmlkLCBwcm9qZWN0cyk7IC8vIHNvbWV0aGluZyBnb2luZyBvbiB3aXRoIHRoaXMgZnVuY3Rpb24/XHJcbiAgICAgICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycsIHByb2plY3RzKTtcclxuICAgICAgICAvLyByZW5kZXIocHJvamVjdHMpO1xyXG4gICAgICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgaW5ib3hUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICAgICAgICAgIHJlbmRlcihwcm9qZWN0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBkYXRlRHVlLnRleHRDb250ZW50ID0gYER1ZSBieSAke3RvZG8uZGF0ZX1gXHJcbiAgICAvLyBpbmRpdmlkdWFsVG9kb0NvbnRhaW5lci5hcHBlbmRDaGlsZChkYXRlRHVlKTtcclxuICAgIC8vIGRhdGVEdWUuY2xhc3NMaXN0LmFkZCgndG9kby1lbCcpO1xyXG5cclxuICAgIHJldHVybiBpbmRpdmlkdWFsVG9kb0NvbnRhaW5lcjtcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYWRkUHJvamVjdC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==