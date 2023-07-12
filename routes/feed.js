const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const feedController = require('../controllers/feed');

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', [
  body('title').trim().isLength({ min: 5 }),
  body('content').trim().isLength({ min: 5 })
], feedController.createPosts);

// GET /feed/post/:postId
router.get('/post/:id', feedController.getPost);

// PUT /feed/post/:postId
router.put('/post/:id', [
  body('title').trim().isLength({ min: 5 }),
  body('content').trim().isLength({ min: 5 })
], feedController.updatePost);

// DELETE /feed/post/:postId
router.delete('/post/:id', feedController.deletePost);

module.exports = router;
