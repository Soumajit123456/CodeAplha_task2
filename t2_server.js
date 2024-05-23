const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 't2_index.html'));
});

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const todo = req.body;
    todos.push(todo);
    res.status(201).json(todo);
});

app.delete('/api/todos/:text', (req, res) => {
    const text = req.params.text;
    todos = todos.filter(todo => todo.text !== text);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
