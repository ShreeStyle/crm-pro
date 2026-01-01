const express = require('express');
const router = express.Router();

// Example test route
router.get('/ping', (req, res) => {
  res.json({ message: 'Pong!' });
});

module.exports = router;
