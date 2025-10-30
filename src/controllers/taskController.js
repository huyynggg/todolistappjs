const db = require('../config/db');

// GET /api/tasks/list/:list_id
exports.getTasksByList = async (req, res, next) => {
  try {
    const rows = await db.query(
      `SELECT id, list_id, user_id, title, description, created_at, due_date, priority, status, updated_at
       FROM tasks WHERE list_id = ? ORDER BY id DESC`,
      [req.params.list_id]
    );
    res.json(rows);
  } catch (err) { next(err); }
};

// GET /api/tasks/user/:user_id
exports.getTasksByUser = async (req, res, next) => {
  try {
    const rows = await db.query(
      `SELECT id, list_id, user_id, title, description, created_at, due_date, priority, status, updated_at
       FROM tasks WHERE user_id = ? ORDER BY id DESC`,
      [req.params.user_id]
    );
    res.json(rows);
  } catch (err) { next(err); }
};

// POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { list_id, user_id, title, description, due_date, priority, status } = req.body;
    if (!list_id || !user_id || !title)
      return res.status(400).json({ message: 'Missing required fields' });

    const result = await db.query(
      `INSERT INTO tasks (list_id, user_id, title, description, created_at, due_date, priority, status, updated_at)
       VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, NOW())`,
      [list_id, user_id, title, description || null, due_date || null, priority || 'medium', status || 'pending']
    );

    res.status(201).json({
      id: result.insertId, list_id, user_id, title, description, due_date, priority: priority || 'medium', status: status || 'pending'
    });
  } catch (err) { next(err); }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, due_date, priority, status } = req.body;
    await db.query(
      `UPDATE tasks
       SET title = ?, description = ?, due_date = ?, priority = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [title || null, description || null, due_date || null, priority || 'medium', status || 'pending', req.params.id]
    );
    res.json({ message: 'Task updated' });
  } catch (err) { next(err); }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (err) { next(err); }
};
