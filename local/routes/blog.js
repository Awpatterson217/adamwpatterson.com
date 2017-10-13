"use strict";

const express = require('express');

const router = express.Router();

router.get('/blog', function(req, res) {
  res.render('blog');
});

module.exports = router;
