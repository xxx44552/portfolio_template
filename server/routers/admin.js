const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require("./../middleware/auth");

router.get('/admin', auth, function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

module.exports = router;