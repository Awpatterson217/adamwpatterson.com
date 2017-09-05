"use strict";

module.exports = function(app) {
 app.get('/home', function(req, res) {
   res.render('index');
 });
 app.get('/about', function(req, res) {
   res.render('about');
 });
 app.get('/blog', function(req, res) {
    res.render('blog');
  });
  app.get('/portfolio', function(req, res) {
    res.render('portfolio');
  });
};
