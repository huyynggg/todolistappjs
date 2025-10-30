const express = require('express');
const c = require('../controllers/taskController');
const router = express.Router();

router.get('/list/:list_id', c.getTasksByList);
router.get('/user/:user_id', c.getTasksByUser);
router.post('/', c.createTask);
router.put('/:id', c.updateTask);
router.delete('/:id', c.deleteTask);

module.exports = router;
