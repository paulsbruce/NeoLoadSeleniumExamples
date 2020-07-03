describe('Selenium Grid Console', () => {
  it('should have proper configuration', function() {

    // load home
    browser.get('http://localhost:4444/')

    $("a.se-console").click()
    browser.wait(protractor.ExpectedConditions.presenceOf($('#title')), 30000, 'Element taking too long to appear in the DOM');

    $("#config-view-toggle").click()
  })
})
