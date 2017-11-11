"use strict";

const validator = require('validator');

const {sanitize}     = require('./safe');
const {isPassFormat} = require('./safe');
const {safeBool}     = require('./safe');
const {safeStr}      = require('./safe');
const {safeNum}      = require('./safe');

let checkEmail = function(req, res, next){
  let email = sanitize(req.body.email);
  if(validator.isEmail(email)){
    req.body.email = email;
    return next();
  }
  req.body.email = '';
  return next();
}

let checkNames = function(req, res, next){
  let firstName  = sanitize(req.body.firstName);
  let middleName = sanitize(req.body.middleName);
  let lastName   = sanitize(req.body.lastName);

  if(firstName.length < 20)
    req.body.firstName = firstName;
  else
    req.body.firstName = '';

  if(middleName.length < 20)
    req.body.middleName = middleName;
  else
    req.body.middleName = '';

  if(lastName.length < 20)
    req.body.lastName = lastName;
  else
    req.body.lastName = '';

  return next();
}

let checkCode = function(req, res, next){
  let code = sanitize(req.body.code);
  if(validator.isNumeric(code)){
    req.body.code = code;
    return next();
  }
  req.body.code = '';
  return next();
}

let checkPhone = function(req, res, next){
  let phone = sanitize(req.body.phone);
  if(validator.isNumeric(phone)){
    req.body.phone = phone;
    return next();
  }
  req.body.phone = '';
  return next();
}

let checkPass = function(req, res, next){
  let pass = sanitize(req.body.password);
  if(isPassFormat(pass)){
    req.body.password = pass;
    return next();
  }
  req.body.password = '';
  return next();
}

let checkPassTwo = function(req, res, next){
  let pass = sanitize(req.body.passwordTwo);
  if(isPassFormat(pass)){
    req.body.passwordTwo = pass;
    return next();
  }
  req.body.passwordTwo = '';
  return next();
}

let checkImage = function(req, res, next){
  let image = sanitize(req.body.image);
  if(validator.isDataURI(image)){
    req.body.image = image;
    return next();
  }
  req.body.image = '';
  return next();
}


let checkAuth = function(req, res, next){
  if(!req.session.userAuth){
    let responseText = '<h1>No Access!</h1>';
    responseText += '<hr>';
    responseText += '<br /> You may need to <a href=\'/login\'>login again.</a>';

    return res.send(responseText);
  }else{
    return next();
  }
}

module.exports = {
  checkEmail  : checkEmail,
  checkPhone  : checkPhone,
  checkNames  : checkNames,
  checkCode   : checkCode,
  checkPass   : checkPass,
  checkPassTwo: checkPassTwo,
  checkAuth   : checkAuth,
  checkImage  : checkImage
}
