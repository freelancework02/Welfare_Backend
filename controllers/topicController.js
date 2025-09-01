const db = require("../db");

// CREATE Topic
exports.createTopic = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.buffer : null; // store as BLOB

    const [result] = await db.execute(
      "INSERT INTO topic (title, image, description) VALUES (?, ?, ?)",
      [title, image, description]
    );

    res.json({ id: result.insertId, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET All Topics
exports.getTopics = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, title, description FROM topic"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Topic by ID
exports.getTopicById = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM topic WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) return res.status(404).json({ error: "Not found" });

    const topic = rows[0];
    if (topic.image) {
      topic.image = topic.image.toString("base64"); // convert blob -> base64
    }

    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Topic
exports.updateTopic = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.buffer : null;

    await db.execute(
      "UPDATE topic SET title=?, image=?, description=? WHERE id=?",
      [title, image, description, req.params.id]
    );

    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Topic
exports.deleteTopic = async (req, res) => {
  try {
    await db.execute("DELETE FROM topic WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// GET ONLY IMAGE by ID
exports.getTopicImage = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT image FROM topic WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0 || !rows[0].image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageBuffer = rows[0].image;

    // Set correct headers so browser knows it's an image
    res.setHeader("Content-Type", "image/jpeg"); // or image/png depending on your uploads
    res.send(imageBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
