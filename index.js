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
    case 'provider':
      return bfs.readdir(path.join(__dirname, 'Makefile.d')).then(function(list) {
        list.forEach(function(item) { console.log(item); });
      });
  }

}().then(function() {
  process.exit(0);
}).catch(function(error) {
  console.error(error);
  process.exit(1);
});
