const express = require('express');
const { createTopic, getTopics, addReply } = require('../controllers/forumController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/topics',  createTopic);
router.get('/topics', getTopics);
router.post('/replies', addReply);

module.exports = router;
