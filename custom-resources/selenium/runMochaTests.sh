#!/bin/sh
SCRIPTPATH=/Users/paul/neoload_projects/NeoLoadSeleniumExamples/custom-resources/selenium/tests/mocha
cd $SCRIPTPATH && /usr/local/bin/node ./node_modules/.bin/wdio run wdio.conf.js $*
