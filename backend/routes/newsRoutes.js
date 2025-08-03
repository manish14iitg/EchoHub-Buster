const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

// Endpoint to process news and find divergent perspectives
router.post('/analyze-news', newsController.analyzeNews);

module.exports = router;