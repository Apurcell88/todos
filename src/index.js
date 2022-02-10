import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import loadInboxPopup from './inbox.js';

const addTaskBtn = document.querySelector('#add-task-btn');

addTaskBtn.addEventListener('click', (e) => {
    loadInboxPopup();
});

export default addTaskBtn;