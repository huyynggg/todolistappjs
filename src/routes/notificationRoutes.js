const express = require('express');
const c = require('../controllers/notificationController');
const router = express.Router();

router.get('/task/:task_id', c.getNotificationsByTask);
router.post('/', c.createNotification);
router.put('/:id', c.updateNotification);
router.delete('/:id', c.deleteNotification);

module.exports = router;
