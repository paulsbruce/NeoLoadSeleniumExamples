describe('Ushahidi App', () => {
  it('should create new post', function() {

    // load home
    browser.get('http://ushahidi')
    expect(browser.getTitle()).toEqual('Posts - Neotys demonstration application');

    //startTransaction('Navigate to form')
    // navigate to form
    $("button.button-alpha.button-fab").click()
    $("a[href='/posts/create/4']").click()
    browser.wait(protractor.ExpectedConditions.presenceOf($('#title')), 30000, 'Element taking too long to appear in the DOM');

    expect(browser.getTitle()).toEqual('Create Post - Neotys demonstration application')
    //stopTransaction()

    var newTitle = 'My new event'

    // fill in form
    $("#title").sendKeys(newTitle)
    $("#content").sendKeys("it's a new event")
    element(by.cssContainingText('option', 'Wild Fire')).click();

    browser.startTransaction('Geosearch')
    // geosearch
    $("*[ng-model='searchLocationTerm']").sendKeys("Boston")
    $("button.btn.btn-info").click()
    //stopTransaction()

    browser.startTransaction('Submit')
    // submit form
    browser.sleep(1000)
    $("button[translate='app.submit']").click();
    browser.sleep(1000)

    expect(browser.getTitle()).toEqual('My new event - Neotys demonstration application')
    //expect($('h1.postcard-title')).toHaveText(newTitle)

    // back to map
    browser.startTransaction('Back to map')
    browser.wait(protractor.ExpectedConditions.presenceOf($("span[translate='post.status_published']")), 5000, 'Element taking too long to appear in the DOM');
    $("svg.iconic").click()
  })
})
