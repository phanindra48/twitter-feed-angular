#Twitter Feed App

Synopsis
-------
Loads twitter feed based on your location and you can also searh tweets 

Search examples
---------------
watching now	containing both “watching” and “now”. This is the default operator.
“happy hour”	containing the exact phrase “happy hour”.
love OR hate	containing either “love” or “hate” (or both).
beer -root	containing “beer” but not “root”.
#haiku	containing the hashtag “haiku”.
from:alexiskold	sent from person “alexiskold”.
to:techcrunch	sent to person “techcrunch”.
@mashable	referencing person “mashable”.
superhero since:2015-07-19	containing “superhero” and sent since date “2015-07-19” (year-month-day).
ftw until:2015-07-19	containing “ftw” and sent before the date “2015-07-19”.
movie -scary :)	containing “movie”, but not “scary”, and with a positive attitude.
flight :(	containing “flight” and with a negative attitude.
traffic ?	containing “traffic” and asking a question.

Installation
------------
Clone/Fork the repo
run 'npm install' command (without quotes) from your terminal and listen on port 8080

API
---
Used twitter api for fetching tweets
Geolocation - to access client location

Contributors
------------
Phanindra Pydisetty
