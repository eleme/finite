## 1. Getting Start

Using Makefile to build this project.

```php
$ make                            # help
$ make install                    # install dependencies
$ make build                      # build only
$ make dev                        # build and watch
$ make build as dist              # build as deploy edition
$ make watch                      # start watch service
```

NOTE: To avoid GFW, recommend using a proxy to install dependencies.

NOTE: NPM Cache may be dirty in sometimes, if you terminate forcedly a runing process such as `Ctrl+C`. In this case you can try to enter `make fucking install` to reinstall all the dependencies.


## 2. Coding Help


#### 2.1 Infrastructure

In this project, we can use [ES6](http://www.ecma-international.org/ecma-262/6.0/) to code. any *.js files will be compiled to [ES5](http://www.ecma-international.org/ecma-262/5.1/) with [babel](https://github.com/babel/babel).

In addition, there is the [ELEME Style Guide](https://github.com/ElemeFE/style-guide), read and follow it please.


#### 2.2 Angular

Now, you should know how to work with Angular.

There is the best [tutorial of Angular](https://docs.angularjs.org/tutorial) in the world, strongly recommend!


#### 2.3 The Directory Structure

```ruby
│
└── src                         # all the source files
    └── _common                 # common components
    ├── index.js                # angular entry
    ├── index.scss              # global styles
    ├── index.html              # project entry
    └── [DIRS]                  # sub routes
```

```ruby
│
└── [DIRS]                      # all the source files
    └── _common                 # common components in the components
    ├── *                       # source files
    └── [DIRS]                  # sub routes
```
