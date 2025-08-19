const db = require('../db');

// Create a new blog post with image, topic, and writer name
exports.createBlog = async (req, res) => {
  try {
    const { title, topic, description, writername } = req.body;
    const image = req.file ? req.file.buffer : null;
    if (!title || !topic || !description || !writername) {
      return res.status(400).json({ error: 'Title, topic, writer name, and description are required.' });
    }
    await db.query(
      "INSERT INTO blogs (title, topic, writername, description, image) VALUES (?, ?, ?, ?, ?)",
      [title, topic, writername, description, image]
    );
    res.json({ message: 'Blog added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get blogs with pagination (limit and offset as query params)
exports.getBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    // Exclude image data for list endpoint
    const [rows] = await db.query(
      "SELECT id, title, topic, writername, description, created_at FROM blogs ORDER BY id DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update blog (all but image)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, topic, writername, description } = req.body;
    await db.query(
      "UPDATE blogs SET title = ?, topic = ?, writername = ?, description = ? WHERE id = ?",
      [title, topic, writername, description, id]
    );
    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Serve image for blog by id (as route: /blogs/:id/image)
exports.getBlogImage = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT image FROM blogs WHERE id = ?", [id]
    );
    if (!rows.length || !rows[0].image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    // Default to jpeg, but you should save MIME type for robustness
    res.set('Content-Type', 'image/jpeg');
    res.send(rows.image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog post by id
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM blogs WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog not found or already deleted.' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
