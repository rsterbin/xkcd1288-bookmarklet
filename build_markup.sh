#!/bin/bash

#
# This script takes bookmarklet.js, compresses it using the YUI compressor
# (linked below), and prints out a link for you to copy/paste.
#
# @see https://github.com/yui/yuicompressor/releases
#

minified=$( java -jar ~/java/yuicompressor-2.4.7/build/yuicompressor-2.4.7.jar bookmarklet.js )
escaped=${minified//\"/&quot;}
echo "<a href=\"javascript:$escaped\">xkcd #1288</a>"

