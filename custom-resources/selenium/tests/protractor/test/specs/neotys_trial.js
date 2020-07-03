describe('Neotys Trial', () => {
  it('should find Neotys', function() {

    browser.waitForAngularEnabled(false);

    browser.get("https://www.neotys.com");

    //startTransaction("Click Trial Button")
    $("a[href='/trial']").click()

    expect(element(by.xpath("//button[@type='submit']")).isDisplayed()).toBeTruthy();

    $('#given-name').sendKeys('Paul');
    $('#family-name').sendKeys('Bruce');
    element(by.cssContainingText('option', 'USA')).click();

    browser.wait(protractor.ExpectedConditions.elementToBeClickable($('#StateUsa')), 5000, 'Element taking too long to appear in the DOM');
  })
})
