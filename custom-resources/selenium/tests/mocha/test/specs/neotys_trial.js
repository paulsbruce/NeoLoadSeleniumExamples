function startTransaction(name) {
  browser.setCookies({ name: 'nl_transaction', value: name })
}
function stopTransaction() {
  browser.deleteCookies(['nl_transaction'])
}
function setScriptName(name) {
  browser.execute((title) => { window.nl_script=title; }, name)
}

describe('Neotys Trial', () => {
  it('should find Neotys', function() {

    setScriptName(this.test.fullTitle())

    //startTransaction("Load Neotys.com")
    browser.url("https://www.neotys.com");

    //startTransaction("Click Trial Button")
    $("a[href='/trial']").click();

    browser.pause(10000)
  })
})
