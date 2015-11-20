default: help

.help:
	@echo "# common tasks"
	@echo "$$ [35mmake[0m                            # help"
	@echo "$$ [35mmake install[0m                    # install dependencies"
	@echo "$$ [35mmake build[0m                      # build only"
	@echo "$$ [35mmake build as dist[0m              # build as dist"
	@echo "$$ [35mmake dev[0m                        # build and watch"
	@echo "$$ [35mmake lint[0m                       # check coding style"
	@echo ""

include $(shell test -x "$$(which finite)" || sudo npm install finite@~1.0.0 -g > /dev/null; finite lib)

install: global-dependencies $(if $(fucking),cache-clean,) node_modules bower_components


############################## Unit Loader ##############################

.js.loader := $(babel) -e 0
.scss.loader := node-sass
.html.loader := $(wildcard)


############################## Building Tasks ##############################

ng-annotate = ./node_modules/.bin/ng-annotate
ng-annotate: .noop
	@echo "[1mExecute[0m $@ ... \c"
	@find dist -name '*.js' | xargs -P 4 -I{} $(ng-annotate) -a {} -o {}
	@echo "[32mOK[0m"


############################## Building Tools ##############################

.build-static:
	@echo "[1mBuild[0m static files ... \c"
	@cp -LR src/* dist
	@echo "[32mOK[0m"

.build-html:
	@echo "[1mBuild[0m html files ... \c"
	@$(wildcard) 'dist/**/*.html'
	@echo "[32m OK[0m"

.build-js:
	@echo "[1mBuild[0m js files ... \c"
	@echo "[35m$$($(babel) src -d dist | wc -l | awk '{print $$1}')[32m files generated[0m"

.build-css:
	@echo "[1mBuild[0m css files ... \c"
	@echo "\033[35m$$(node-sass src -o dist 2>&1 | grep '^Wrote CSS' | wc -l | awk '{print $$1}')\033[32m files generated\033[0m"

.dist: ng-annotate usemin rev

build: clean install .build-static .build-js .build-css .build-html $(if $(dist),.dist,)

dev: install build watch

.PHONY: dist


############################## Building Tools ##############################

server:
	@python -m SimpleHTTPServer 3154 > /dev/null 2>&1 &
	@open http://localhost:3154
