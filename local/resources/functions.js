"use strict";

const path = require('path');
const exec = require('child_process').exec;

const log = console.log;

const execute = (cmd) => {
  exec(cmd, function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    if (err !== null)
      log('exec error: ' + err);
  });
}

const isEmpty = function(...str){
  const params = [...str];
  let empty  = false;

  params.forEach(function(val, index, array){
    if(val === '')
      empty = true;
  });
  if(empty)
    return true;
  return false;  
}

module.exports = {
  isEmpty,
  execute,
  log,
  sep: path.sep
}
