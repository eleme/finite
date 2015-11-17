#!/usr/bin/env node

var argollector = require('argollector');
var bfs = require('babel-fs');
var path = require('path');

void function() {

  // 查看版本号
  if(argollector['-v'] || argollector['--version']) {
    return bfs.readFile(path.join(__dirname, 'package.json')).then(function(data) {
      console.log(JSON.parse(data).version);
    });
  }

  // 命令处理
  switch(argollector[0]) {
    case 'lib':
      return bfs.readdir(path.join(__dirname, 'Makefile.d')).then(function(list) {
        list.forEach(function(item) { console.log(item); });
      });
    case 'dir':
      console.log(__dirname);
      return Promise.resolve();
    default:
      return Promise.reject('Unknown Command: ' + argollector[0]);
  }

}().then(function() {
  process.exit(0);
}).catch(function(error) {
  console.error('[31m' + error + '[0m');
  process.exit(1);
});
