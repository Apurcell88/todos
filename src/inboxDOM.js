export const todosContainer = document.querySelector('#todos-display-container');

export function displayTodo(todos) {
    todos.forEach((todo) => {
        const individualTodoContainer = document.createElement('div');

        const completedTodoCheckbox = document.createElement('input');
        completedTodoCheckbox.setAttribute('type', 'checkbox');
        completedTodoCheckbox.classList.add('margin-right');
        individualTodoContainer.appendChild(completedTodoCheckbox);

        const todoEl = document.createElement('span');
        todoEl.textContent = `${todo.title} Priority: ${todo.priority}`;
        individualTodoContainer.appendChild(todoEl);
        todosContainer.appendChild(individualTodoContainer);
    });
}