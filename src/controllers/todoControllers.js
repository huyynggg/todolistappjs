let todos = [
    {id: 1, task: 'Learn JS', done: false},
    {id: 2, task: 'Go gym', done: true},
];

exports.getTodos = (req, res) => {
    res.json(todos);
};

exports.createTodos = (req, res) => {
    const { task } = req.body;
    const newTodo = { id: todos.length + 1, task, done: false };
    todos.push (newTodo);
    res.status(201).json(newTodo);
};  

exports.updateTodo = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found.');

        todo.task = req.body.task ?? todo.task;
		todo.done = req.body.done ?? todo.done;
		res.json(todo);
	}; 
exports.deleteTodo = (req, res) => {
		todos = todos.filter(t => t.id !== parseInt(req.params.id));
		res.status(204).send();
	};
