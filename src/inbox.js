import addTaskBtn from "./index.js";
const taskPopup = document.querySelector('#add-task-popup');

function loadInboxPopup() {
    addTaskBtn.classList.add('hide-display');
    taskPopup.classList.add('show-display-flex');
}

export default loadInboxPopup;