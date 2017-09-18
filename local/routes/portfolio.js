"use strict";
const express = require('express');

const router = express.Router();

router.get('/portfolio', function(req, res) {
  res.render('portfolio');
});

module.exports = router;
