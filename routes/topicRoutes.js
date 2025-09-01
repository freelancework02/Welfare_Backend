const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer setup for memory storage (images stored as BLOB in DB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const topicController = require("../controllers/topicController");

// CRUD routes
router.post("/", upload.single("image"), topicController.createTopic);
router.get("/", topicController.getTopics);
router.get("/:id", topicController.getTopicById);
router.put("/:id", upload.single("image"), topicController.updateTopic);
router.delete("/:id", topicController.deleteTopic);

// GET image by ID
router.get("/:id/image", topicController.getTopicImage);

module.exports = router;
