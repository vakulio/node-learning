const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const Post = require('../models/post');

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: 'Fetched posts successfully',
        posts
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPosts = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided');
    error.statusCode = 422;
    throw error;
  }
  const { title } = req.body;
  const { content } = req.body;
  const imageUrl = req.file.path.replace('\\', '/');
  // Create post in db
  const post = new Post({
    title, content, creator: { name: 'Vakulio' }, imageUrl
  });
  post.save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Post was created',
        post: result
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getPost = (req, res, next) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Post fetched',
        post
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  const { title, content } = req.body;
  let imageUrl = req.body.image;
  console.log(imageUrl);
  if (req.file) {
    imageUrl = req.file.path.replace('\\', '/');
    console.log(imageUrl);
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Post.findById(id)
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    }).then((result) => res.status(200).json({ message: 'Post updated', post: result })).catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(id);
    })
    .then((result) => res.status(200).json({ message: 'Post deleted' }))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
