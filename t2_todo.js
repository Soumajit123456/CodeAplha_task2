document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    fetch('/api/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => addTodoToDOM(todo.text));
        });

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodoText = todoInput.value.trim();
        if (newTodoText !== "") {
            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newTodoText }),
            })
            .then(response => response.json())
            .then(todo => {
                addTodoToDOM(todo.text);
                todoInput.value = '';
            });
        }
    });

    function addTodoToDOM(text) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.padding = '10px';
        li.style.borderBottom = '1px solid #ccc';

        const span = document.createElement('span');
        span.textContent = text;
        span.style.cursor = 'pointer';
        span.addEventListener('click', () => {
            span.style.textDecoration = span.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.background = 'none';
        deleteButton.style.border = 'none';
        deleteButton.style.color = '#007BFF';
        deleteButton.style.cursor = 'pointer';
        deleteButton.addEventListener('click', () => {
            fetch(`/api/todos/${text}`, {
                method: 'DELETE',
            }).then(() => {
                li.remove();
            });
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }
});
