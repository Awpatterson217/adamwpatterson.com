"use strict";

module.exports = function(app) {
  app.get('/home', function(req, res) {
    res.render('index');
  });
  app.get('/portfolio', function(req, res) {
    res.render('portfolio');
  });
  app.get('/about', function(req, res) {
    res.render('about');
  });
  app.get('/contact', function(req, res) {
    res.render('contact');
  });
  app.get('/blog', function(req, res) {
    res.render('blog');
  });
};
