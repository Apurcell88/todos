/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/inboxDOM.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "todosContainer": () => (/* binding */ todosContainer),
/* harmony export */   "displayTodo": () => (/* binding */ displayTodo)
/* harmony export */ });
const todosContainer = document.querySelector('#todos-display-container');

function displayTodo(todos) {
    todos.forEach((todo) => {
        const individualTodoContainer = document.createElement('div');

        const completedTodoCheckbox = document.createElement('input');
        completedTodoCheckbox.setAttribute('type', 'checkbox');
        completedTodoCheckbox.classList.add('margin-right', 'font-size');
        individualTodoContainer.appendChild(completedTodoCheckbox);

        const dueDate = document.createElement('input');
        dueDate.setAttribute('type', 'date');
        individualTodoContainer.appendChild(dueDate);

        const todoEl = document.createElement('span');
        todoEl.textContent = `${todo.title} Priority: ${todo.priority}`;
        individualTodoContainer.appendChild(todoEl);
        todosContainer.appendChild(individualTodoContainer);
    });
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5ib3hET00uYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05PO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFlBQVksWUFBWSxjQUFjO0FBQ3RFO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2Rvcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb3MvLi9zcmMvaW5ib3hET00uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgY29uc3QgdG9kb3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kb3MtZGlzcGxheS1jb250YWluZXInKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5VG9kbyh0b2Rvcykge1xyXG4gICAgdG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluZGl2aWR1YWxUb2RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFRvZG9DaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgY29tcGxldGVkVG9kb0NoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xyXG4gICAgICAgIGNvbXBsZXRlZFRvZG9DaGVja2JveC5jbGFzc0xpc3QuYWRkKCdtYXJnaW4tcmlnaHQnLCAnZm9udC1zaXplJyk7XHJcbiAgICAgICAgaW5kaXZpZHVhbFRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQoY29tcGxldGVkVG9kb0NoZWNrYm94KTtcclxuXHJcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgZHVlRGF0ZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZGF0ZScpO1xyXG4gICAgICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpO1xyXG5cclxuICAgICAgICBjb25zdCB0b2RvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgdG9kb0VsLnRleHRDb250ZW50ID0gYCR7dG9kby50aXRsZX0gUHJpb3JpdHk6ICR7dG9kby5wcmlvcml0eX1gO1xyXG4gICAgICAgIGluZGl2aWR1YWxUb2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9FbCk7XHJcbiAgICAgICAgdG9kb3NDb250YWluZXIuYXBwZW5kQ2hpbGQoaW5kaXZpZHVhbFRvZG9Db250YWluZXIpO1xyXG4gICAgfSk7XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=