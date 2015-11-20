#!/usr/bin/env node

var argollector = require('argollector');
var Capacitance = require('capacitance');
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

Promise.resolve().then(function() {

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
    case 'install':
      var name = String(argollector[1]);
      var repo = path.join(__dirname, 'repositories', name);
      var cwd = process.cwd();
      return bfs.readdir(cwd).then(function(list) {
        if(list.length) throw 'Error: cwd is not empty';
        return bfs.stat(repo).then(function(stat) {
          if(!stat.isDirectory()) throw 'Error: cannot find ' + name;
          return require('child_process').exec('cp -r ' + repo + '/* ' + cwd).stdout.pipe(new Capacitance());
        });
      });
    default:
      throw 'Error: unknown command ' + argollector[0];
  }

}).then(function() {
  process.exit(0);
}).catch(function(error) {
  console.error('[31m' + error + '[0m');
  process.exit(1);
});
