const db = require('../config/db');

// GET /api/notifications/task/:task_id
exports.getNotificationsByTask = async (req, res, next) => {
  try {
    const rows = await db.query(
      'SELECT id, task_id, notify_at, status FROM notifications WHERE task_id = ? ORDER BY notify_at DESC',
      [req.params.task_id]
    );
    res.json(rows);
  } catch (err) { next(err); }
};

// POST /api/notifications
exports.createNotification = async (req, res, next) => {
  try {
    const { task_id, notify_at, status } = req.body;
    if (!task_id || !notify_at)
      return res.status(400).json({ message: 'Missing required fields' });

    const result = await db.query(
      'INSERT INTO notifications (task_id, notify_at, status) VALUES (?, ?, ?)',
      [task_id, notify_at, status || 'pending']
    );

    res.status(201).json({ id: result.insertId, task_id, notify_at, status: status || 'pending' });
  } catch (err) { next(err); }
};

// PUT /api/notifications/:id
exports.updateNotification = async (req, res, next) => {
  try {
    const { notify_at, status } = req.body;
    await db.query(
      'UPDATE notifications SET notify_at = ?, status = ? WHERE id = ?',
      [notify_at || null, status || 'pending', req.params.id]
    );
    res.json({ message: 'Notification updated' });
  } catch (err) { next(err); }
};

// DELETE /api/notifications/:id
exports.deleteNotification = async (req, res, next) => {
  try {
    await db.query('DELETE FROM notifications WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (err) { next(err); }
};
