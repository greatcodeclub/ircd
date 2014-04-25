BIN = `npm bin`

lib/parser.js: lib/parser.jison
	${BIN}/jison $^ -o $@

test: lib/parser.js
	${BIN}/mocha --reporter spec

watch:
	${BIN}/nodemon -x 'make test' -e 'js jison' -q

.PHONY: test watch