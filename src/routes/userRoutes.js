const express = require('express');
const c = require('../controllers/userController');
const router = express.Router();

router.get('/', c.getUsers);
router.get('/:id', c.getUserById);
router.post('/', c.createUser);
router.delete('/:id', c.deleteUser);

module.exports = router;

