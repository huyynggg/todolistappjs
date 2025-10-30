const db = require('../config/db');

// GET /api/users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.query(
      'SELECT id, name, email, created_at FROM users ORDER BY id DESC'
    );
    res.json(users);
  } catch (err) { next(err); }
};

// GET /api/users/:id
exports.getUserById = async (req, res, next) => {
  try {
    const [user] = await db.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.params.id]
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

// POST /api/users
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing required fields' });

    const result = await db.query(
      'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, password]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ message: 'Email already in use' });
    next(err);
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (err) { next(err); }
};
