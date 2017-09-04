"use strict";

module.exports = function(app) {
 app.get('/home', function(req, res) {
   res.render('index');
 });
 app.get('/about', function(req, res) {
   res.render('/about');
 });
 app.get('/blog', function(req, res) {
    res.render('/blog');
  });
  app.get('/portfolio', function(req, res) {
    res.render('/portfolio');
  });
};
/*
<!DOCTYPE html>
<html lang="en">
  <% include includes/head %>
  <body>
    <% include includes/nav %>

    <section name=”jumbotron” >
      <div class=”jumbotron text-center”>
        <p>Welcome to home</p>
      </div>
    </section>

    <% include includes/footer %>
    
    <% include includes/scripts %>
  </body>
</html>
*/