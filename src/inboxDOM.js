export const todosContainer = document.querySelector('#todos-display-container');

export function displayTodo(todos) {
    todos.forEach((todo) => {
        const individualTodoContainer = document.createElement('div');

        const completedTodoCheckbox = document.createElement('input');
        completedTodoCheckbox.setAttribute('type', 'checkbox');
        completedTodoCheckbox.classList.add('completed-todo-checkbox');
        individualTodoContainer.appendChild(completedTodoCheckbox);

        const todoEl = document.createElement('span'); // make into button so when clicked the text can be edited
        todoEl.textContent = `${todo.title} Priority: ${todo.priority}`;
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

        const dueDate = document.createElement('input');
        dueDate.setAttribute('type', 'date');
        dueDate.classList.add('due-date');
        individualTodoContainer.appendChild(dueDate);
        todosContainer.appendChild(individualTodoContainer);
    });
}