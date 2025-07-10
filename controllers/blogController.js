const db = require('../db');

exports.createBlog = async (req, res) => {
  const { title, description } = req.body;
  try {
    await db.query("INSERT INTO blogs (title, description) VALUES (?, ?)", [title, description]);
    res.json({ message: 'Blog added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM blogs ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    await db.query("UPDATE blogs SET title = ?, description = ? WHERE id = ?", [title, description, id]);
    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
