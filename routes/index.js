const express = require("express");
const router = express.Router();

// Import controller method
const { getStatus, getStats } = require("../controllers/AppController");

// Define routes
router.get("/status", getStatus);
router.get("/stats", getStats);

module.exports = router;
