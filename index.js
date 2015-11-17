#!/usr/bin/env node

var argollector = require('argollector');
var bfs = require('babel-fs');
var path = require('path');

// 查看版本号
if(argollector['-v'] || argollector['--version']) {
  bfs.readFile(path.join(__dirname, 'package.json')).then(function(data) {
    console.log(JSON.parse(data).version);
    process.exit(0);
  }).catch(function(error) {
    console.error(error);
    process.exit(1);
  });
}
