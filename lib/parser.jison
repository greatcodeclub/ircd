%lex

%%

\r?\n                 return 'CRLF'
\s                    // ignore spaces

'NICK'                return 'NICK'
'USER'                return 'USER'
'JOIN'                return 'JOIN'
'PRIVMSG'             return 'PRIVMSG'
'QUIT'                return 'QUIT'

":"[^\r\n]+           return 'STRING'

'#'\w+                return 'CHANNEL'

[^\s]+                return 'WORD'

<<EOF>>               return 'EOF'

/lex

%%

data:
  requests EOF
;

requests:
  request
| requests request
;

request:
  command CRLF                  { yy.onRequest($1) }
| error CRLF
;

command:
  NICK WORD                     { $$ = { command: $1, nick: $2 } }
| USER WORD WORD WORD string    { $$ = { command: $1, login: $2, flags: $3, host: $4, fullName: $5 } }
| JOIN CHANNEL                  { $$ = { command: $1, channel: $2 } }
| PRIVMSG CHANNEL string        { $$ = { command: $1, channel: $2, message: $3 } }
| QUIT                          { $$ = { command: $1 } }
;

string:
  STRING                        { $$ = $1.slice(1) }
;

%%
// Custom code in the parser

// Set our own callback
parser.onRequest = function(callback) {
  this.yy.onRequest = callback
}
