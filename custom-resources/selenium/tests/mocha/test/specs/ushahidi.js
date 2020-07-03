describe('Ushahidi App', () => {
  it('should create new post', function() {

    browser.setScriptName(this.test.fullTitle())

    // load home
    browser.url('http://ushahidi')
    expect(browser).toHaveTitle('Posts - Neotys demonstration application');

    //startTransaction('Navigate to form')
    // navigate to form
    $("button.button-alpha.button-fab").click()
    $("//div[@id='bootstrap-app']/ng-view/div/main/div/post-toolbar/div/div/ul/li[2]/a/span[2]").click();
    $("#title").waitForExist()

    expect(browser).toHaveTitle('Create Post - Neotys demonstration application')
    //stopTransaction()

    var newTitle = 'My new event'

    // fill in form
    $("#title").setValue(newTitle)
    $("#content").setValue("it's a new event")
    $("*[name='values_21']").selectByVisibleText("Wild Fire")

    browser.startTransaction('Geosearch')
    // geosearch
    $("*[ng-model='searchLocationTerm']").setValue("Boston")
    $("button.btn.btn-info").click()
    //stopTransaction()

    browser.startTransaction('Submit')
    // submit form
    browser.pause(1000)
    $("(//button[@type='submit'])[2]").click()
    browser.pause(1000)

    expect(browser).toHaveTitle('My new event - Neotys demonstration application')
    expect($('h1.postcard-title')).toHaveText(newTitle)

    // back to map
    browser.startTransaction('Back to map')
    $("span[translate='post.status_published']").waitForExist()
    $("svg.iconic").click()
  })
})
