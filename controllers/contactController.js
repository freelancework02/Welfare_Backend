const db = require('../db');

// Insert contact form data
exports.submitContact = async (req, res) => {
  const { name, email, description } = req.body;
  try {
    await db.query(
      "INSERT INTO contacts (name, email, description) VALUES (?, ?, ?)",
      [name, email, description]
    );
    res.json({ message: 'Contact form submitted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contact submissions
exports.getContacts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT name, email, description FROM contacts ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
