const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/blogs', blogController.createBlog);
router.get('/blogs', blogController.getBlogs);
router.put('/blogs/:id', blogController.updateBlog);

module.exports = router;
