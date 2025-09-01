const db = require("../db");

// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.buffer : null; // store as BLOB

    const [result] = await db.execute(
      "INSERT INTO category (title, image, description) VALUES (?, ?, ?)",
      [title, image, description]
    );

    res.json({ id: result.insertId, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET All Categories
exports.getCategories = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, title, description FROM category"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM category WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) return res.status(404).json({ error: "Not found" });

    const category = rows[0];
    if (category.image) {
      category.image = category.image.toString("base64"); // convert blob -> base64
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Category
exports.updateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.buffer : null;

    await db.execute(
      "UPDATE category SET title=?, image=?, description=? WHERE id=?",
      [title, image, description, req.params.id]
    );

    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Category
exports.deleteCategory = async (req, res) => {
  try {
    await db.execute("DELETE FROM category WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ONLY IMAGE by ID
// GET ONLY IMAGE by ID
exports.getCategoryImage = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT image FROM category WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length || !rows[0].image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Defaulting to JPEG since no mimetype column exists
    res.setHeader("Content-Type", "image/jpeg");
    res.send(rows[0].image);
  } catch (err) {
    console.error("Error fetching category image:", err);
    res.status(500).json({ error: err.message });
  }
};

