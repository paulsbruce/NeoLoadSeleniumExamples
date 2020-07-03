#!/bin/sh
SCRIPTPATH=/Users/paul/neoload_projects/NeoLoadSeleniumExamples/custom-resources/selenium/tests/protractor
cd $SCRIPTPATH && /usr/local/bin/node node_modules/.bin/protractor conf.js --disableChecks $*
