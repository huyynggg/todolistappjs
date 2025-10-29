const express = require('express');
	const router = express.Router();
	const todoController = require('app-name/controllers/todoController');
	
	router.get('/', todoController.getTodos);
	router.post('/', todoController.createTodo);
	router.put('/', todoController.putTodo);
	router.delete('/:id', todoController.deleteTodo);

	Module.exports = router;
