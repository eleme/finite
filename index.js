#!/usr/bin/env node

var argollector = require('argollector');
var bfs = require('babel-fs');
var path = require('path');

//
var findFiles = function callee(cwd) {
  return bfs.readdir(cwd).then(function(list) {
    return Promise.all(list.filter(function(name) {
      return !/^\./.test(name);
    }).map(function(name) {
      var abs = path.join(cwd, name);
      return bfs.stat(abs).then(function(stat) {
        return stat.isDirectory() ? callee(abs) : abs;
      });
    })).then(function(results) {
      return [].concat.apply([], results);
    });
  });
}

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
      var lib = path.join(__dirname, 'Makefile.d');
      return findFiles(lib).then(function(list) {
        console.log(list.join('\n'));
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
