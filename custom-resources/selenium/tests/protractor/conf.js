const yargs = require('yargs');

var init = function(config) {
  var argv = yargs.argv;

  var capabilities = config.capabilities;

  // there are only a few special things to get NeoLoad working in any context
  if(argv.neoloadMode) capabilities['neoload:mode'] = argv.neoloadMode
  if(argv.neoloadHost) capabilities['neoload:host'] = argv.neoloadHost
  if(argv.neoloadPort) capabilities['neoload:port'] = argv.neoloadPort
  if(argv.neoloadMode) capabilities['neoload:location'] = 'protractor'
  if(argv.neoloadDebug) capabilities['neoload:debug'] = true
  //if(argv.neoloadMode) capabilities['neoload:w3cEventTypes'] = "mark|measure|paint|longtask|frame|navigation|resource".split("|");

  config['onPrepare'] = function() {
    browser.startTransaction = function(name) {
      browser.manage().addCookie({ name: 'nl_transaction', value: name })
    }
    browser.stopTransaction = function() {
      browser.manage().deleteCookie('nl_transaction')
    }
    browser.setScriptName = function(name) {
      browser.executeScript('window.nl_script=arguments[0]',name)
    }
    //FROM: https://github.com/jasmine/jasmine/issues/611#issuecomment-553098129
    jasmine.getEnv().addReporter({
      specStarted: spec => {
        browser.setScriptName(spec.fullName)
      },
      specDone: spec => {
        browser.stopTransaction();
      },
    });
  }
  config['onComplete'] = function() { browser.stopTransaction(); }

  // set other options
  if(argv.browser) capabilities['browserName'] = argv.browser
  var isFF = capabilities['browserName'] === 'firefox'
  var isCh = capabilities['browserName'] === 'chrome'
  if(argv.headless) {
    if(isFF) capabilities['moz:firefoxOptions'] = { args: ['-headless'] }
    if(isCh) capabilities['goog:chromeOptions'] = { args: ['--headless'] }//, '--disable-gpu'] }
  }

  config.capabilities = capabilities;

  console.log('Sending capabilities request: ' + JSON.stringify(capabilities))
  return config;
}

exports.config = (function() {
  return init({
    specs: ['./test/specs/**/*.js'],
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
      browserName: 'firefox',
    },
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000 // 5 min // https://www.protractortest.org/#/timeouts
    },
    getPageTimeout: 30000,
    allScriptsTimeout: 30000,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true
  });
})();
