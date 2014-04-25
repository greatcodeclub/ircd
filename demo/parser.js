var Parser = require('../lib/parser').Parser

var parser = new Parser()

// Each time a request is parsed, this callback is called.
parser.onRequest(function(request) {
  console.log(request)
})

parser.parse("NICK marc\r\n")

parser.parse("JOIN #channel\r\nQUIT\r\n")