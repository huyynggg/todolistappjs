const db = require('../config/db');

// GET /api/lists/user/:user_id
exports.getListsByUser = async (req, res, next) => {
  try {
    const rows = await db.query(
      'SELECT id, user_id, title, category, description, created_at, status FROM lists WHERE user_id = ? ORDER BY id DESC',
      [req.params.user_id]
    );
    res.json(rows);
  } catch (err) { next(err); }
};

// POST /api/lists
exports.createList = async (req, res, next) => {
  try {
    const { user_id, title, category, description, status } = req.body;
    if (!user_id || !title)
      return res.status(400).json({ message: 'Missing required fields' });

    const result = await db.query(
      `INSERT INTO lists (user_id, title, category, description, created_at, status)
       VALUES (?, ?, ?, ?, NOW(), ?)`,
      [user_id, title, category || null, description || null, status || 'active']
    );

    res.status(201).json({
      id: result.insertId, user_id, title, category, description, status: status || 'active'
    });
  } catch (err) { next(err); }
};

// PUT /api/lists/:id
exports.updateList = async (req, res, next) => {
  try {
    const { title, category, description, status } = req.body;
    await db.query(
      'UPDATE lists SET title = ?, category = ?, description = ?, status = ? WHERE id = ?',
      [title || null, category || null, description || null, status || 'active', req.params.id]
    );
    res.json({ message: 'List updated' });
  } catch (err) { next(err); }
};

// DELETE /api/lists/:id
exports.deleteList = async (req, res, next) => {
  try {
    await db.query('DELETE FROM lists WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (err) { next(err); }
};
