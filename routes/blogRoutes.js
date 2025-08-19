const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create blog with image (buffer upload)
router.post('/blogs', upload.single('image'), blogController.createBlog);

// Get blogs with pagination (limit & offset query params)
router.get('/blogs', blogController.getBlogs);

// ✅ Get single blog by ID
router.get('/blogs/:id', blogController.getBlogById);

// Update blog (all but image)
router.put('/blogs/:id', blogController.updateBlog);

// Get blog image by id
router.get('/blogs/:id/image', blogController.getBlogImage);

// Delete blog by id
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;
