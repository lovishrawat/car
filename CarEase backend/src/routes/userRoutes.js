const express = require('express');
const { Clerk } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

const router = express.Router();

// Clerk middleware to verify session
const authenticate = async (req, res, next) => {
  const { sessionId } = req.headers;
  try {
    const session = await Clerk.sessions.verifySession(sessionId);
    req.userId = session.userId;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};

// Create User (Clerk will handle user creation automatically)
router.post('/signup', authenticate, async (req, res) => {
  const { sessionId } = req.headers;
  const session = await Clerk.sessions.verifySession(sessionId);

  const user = new User({ clerkId: session.userId });
  await user.save();
  res.status(201).send('User created');
});

module.exports = router;
