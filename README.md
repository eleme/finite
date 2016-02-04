# Finite (F-init-E)

A web front-end project one command constructing tool.

### Install

```bash
sudo npm install finite -g
```

### Create a new angular project

```bash
mkdir YOUR_PROJECT_NAME
cd YOUR_PROJECT_NAME
finite install angular-helloworld
```

### MAKE Tools

Install global dependencies into your system, such as "node-sass", "bower", or "eslint".

```bash
make global-dependencies
```

Install project dependencies with bower.json or package.json.

```bash
make bower_components
make node_modules
```

Execute some building tasks with <a target="_blank" href="/elemefe/webspoon">webspoon</a>.

```bash
make rev
make usemin
make watch
```

Parse php files, and output to dist.

```bash
make php
```

Check coding styles with eslint.

```bash
make lint
```

Unit building.

```Makefile
.js.loader := babel
.scss.processor := node-sass $$src -d $$dist
```

```bash
make src/a.js # cat $$src | babel > $$dist
```

```bash
make src/a.scss # node-sass $$src -d $$dist
```
