export const todosContainer = document.querySelector('#todos-display-container');

export function displayTodo(todos) {
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