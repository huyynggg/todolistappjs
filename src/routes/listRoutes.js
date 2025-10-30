const express = require('express');
const c = require('../controllers/listController');
const router = express.Router();

router.get('/user/:user_id', c.getListsByUser);
router.post('/', c.createList);
router.put('/:id', c.updateList);
router.delete('/:id', c.deleteList);

module.exports = router;
