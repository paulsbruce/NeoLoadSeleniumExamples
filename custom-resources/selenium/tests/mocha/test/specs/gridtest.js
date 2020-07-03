describe('Selenium Grid Console', () => {
  it('should have proper configuration', function() {

    browser.setScriptName(this.test.fullTitle())
    
    // load home
    browser.url('http://localhost:4444/')
    browser.pause(1000)

    $("a.se-console").click()
    browser.pause(1000)

    $("#config-view-toggle").click()
    browser.pause(1000)

    $("#verbose-config-view-toggle").click()
    browser.pause(1000)

    $("a[title='node configuration']").click()
    browser.pause(1000)
  })
})
