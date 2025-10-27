#!/bin/sh
# Script to open CORS available chrome browser

open -a "Google Chrome" --args --disable-web-security --user-data-dir=/tmp/chrome
