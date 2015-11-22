#!/usr/bin/env node

var argollector = require('argollector');
var Capacitance = require('capacitance');
var bfs = require('babel-fs');
var path = require('path');

// 找到一个目录下的所有文件并排除隐藏文件（find $cwd -type f ! -name '.*'）
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
};


/**
 * 子命令定义
**/

// 创建一个不继承自 Object 的 object 作为 Map 使用，否侧会受到一些 toString 之类继承的干扰
// 此处之所以不用 Map 是因为低版本 node 对 Map 的支持有坑
var commandHandlers = Object.create(null);

// lib 命令，输出当前可用的库目录路径（因为子项目前端构建工具的依赖由 finite 直接管理）
commandHandlers.lib = function() {
  var lib = path.join(__dirname, 'Makefile.d');
  return findFiles(lib).then(function(list) {
    console.log(list.join('\n'));
  });
};

// dir 命令，输出 finite 的安装路径（便于调试，以及一些 Makefile 任务）
commandHandlers.dir = function() {
  console.log(__dirname);
  return Promise.resolve();
};

// install 命令，将前端项目安装到当前目录（当前目录必须为空）
commandHandlers.install = function() {
  var name = argollector[1];
  if(!name) return Promise.reject('Error: "install" command require one argument');
  var repo = path.join(__dirname, 'repositories', name);
  var cwd = process.cwd();
  return Promise.all([
    bfs.readdir(cwd),
    bfs.stat(repo).catch(function() {})
  ]).then(function(results) {
    // 检测 cwd 是否为空，不为空就抛异常
    if(results[0].length) throw 'Error: cwd is not empty';
    // 检测 repo 是否存在，不存在则抛出异常
    if(!results[1] || !results[1].isDirectory()) throw 'Error: can not install "' + name + '", it\'s not found';
  }).then(function(stat) {
    console.log('[1;32m✅  install [1;36m"' + name + '"[1;32m successfully[0m');
    // 将 repo 目录深度 copy 到 cwd 目录（这里偷个懒，创建子进程 cp -r 过去）
    return require('child_process').exec('cp -r ' + repo + '/* ' + cwd).stdout.pipe(new Capacitance());
  });
};


/**
 * 主过程
**/

Promise.resolve().then(function() {
  // 特殊参数处理
  // 查看版本号
  if(argollector['-v'] || argollector['--version']) {
    return bfs.readFile(path.join(__dirname, 'package.json')).then(function(data) {
      console.log(JSON.parse(data).version);
    });
  }
  // 命令处理
  var command = String(argollector[0]);
  var handler = commandHandlers[command];
  return handler ? handler() : Promise.reject('Error: unknown command ' + command);
}).then(function() {
  process.exit(0);
}).catch(function(error) {
  message = '❌  [1;31m' + error + '[0m';
  message = message.replace(/".*?"/, '[1;35m$&[1;31m');
  console.error(message);
  process.exit(1);
});
