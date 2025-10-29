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
    Todos.push (newTodo);
    res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found.');

        Todo.task = req.body.task ?? todo.task;
		Todo.done = req.body.done ?? todo.done;
		res.json(todo);
	}; 
exports.deleteTodo = (req, res) => {
		Todos = todos.filter(t => t.id !== parseInt(req.params.id));
		Res.status(204).send();
	};
