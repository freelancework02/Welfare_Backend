const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer setup for memory storage (images stored as BLOB in DB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const categoryController = require("../controllers/categoryController");

// CRUD routes
router.post("/", upload.single("image"), categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", upload.single("image"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

// GET image by ID
router.get("/:id/image", categoryController.getCategoryImage);

module.exports = router;
