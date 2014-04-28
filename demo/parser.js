var Parser = require('../lib/parser').Parser

var parser = new Parser()

// Each time a message is parsed, this callback is called.
parser.onMessage(function(message) {
  console.log(message)
})

parser.parse("NICK marc\r\n")

parser.parse("JOIN #channel\r\nQUIT\r\n")