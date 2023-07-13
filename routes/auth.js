const express = require('express');
const { body } = require('express-validator');
const userControllers = require('../controllers/auth');
const User = require('../models/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// PUT /auth/signup
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) =>
        User.findOne({ email: value }).then((userDoc) => {
          // eslint-disable-next-line prefer-promise-reject-errors
          if (userDoc) Promise.reject('Email address already exists!');
        })
      )
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty()
  ],
  userControllers.signup
);
// POST /auth/login
router.post('/login', userControllers.login);
// GET /auth/status
router.get('/status', isAuth, userControllers.getUserStatus);
// PATCH /auth/status
router.patch('/status', isAuth, [body('status').trim().not().isEmpty()], userControllers.patchUserStatus);
module.exports = router;
