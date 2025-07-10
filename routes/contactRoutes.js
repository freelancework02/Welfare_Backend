const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST: Submit contact form
router.post('/contact', contactController.submitContact);

// GET: Fetch all contacts
router.get('/contact', contactController.getContacts);

module.exports = router;
