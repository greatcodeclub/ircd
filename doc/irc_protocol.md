# IRC protocol fundamentals
Lines starting with ">" are sent by the client.
Indented ones are sent by the server.

Source: [Internet Relay Chat Protocol](http://irchelp.org/irchelp/rfc/rfc.html)

## Signing-in

> NICK nickname
> USER username hostname.com servername.com :Real Name

    :server.net 001 nickname :Welcome
    :server.net 002 nickname :Your host is userhost.com, running version ircd-1.0
    :server.net 376 nickname :End of /MOTD command.

## Joining a channel

> JOIN #channel

    :from-nick!~from-username@from-hostname JOIN #channel
    :server.net 353 nickname @ #channel :@nickname
    :server.net 366 nickname #channel :End of /NAMES list.

## Send a message

> PRIVMSG #channel :Hi there

Broadcasting message to others

    :nickname!~login@userhost.com PRIVMSG #channel :Hi there

## Quitting server

> QUIT :Bye!

Or

> QUIT

    :nickname!~login@userhost.com QUIT :Bye!