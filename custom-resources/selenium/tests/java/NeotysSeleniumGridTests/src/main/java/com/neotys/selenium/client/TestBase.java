package com.neotys.selenium.client;

import org.openqa.selenium.Cookie;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.util.concurrent.TimeUnit;

public class TestBase {
    private static TestsRuntime _runtime;

    public WebDriver driver;

    protected static void beforeClass() {
        _runtime = TestsRuntime.fromArgs(Main.getArgs());
    }

    protected void setup() {
        // this is where we take what has been handed in via command line (Runtime) and set as capabilities
        driver = new RemoteWebDriver(
                _runtime.getHubUrl(), new DesiredCapabilities(_runtime.getCapabilities())
        );
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    }

    protected void startTransaction(String name) {
        driver.manage().addCookie(new Cookie("nl_transaction", name));
    }
    protected void stopTransaction() {
        driver.manage().deleteCookieNamed("nl_transaction");
    }
    protected void setScriptName(String name) {
        ((JavascriptExecutor)driver).executeScript("(title) => { window.nl_script=title; }", name);
    }
}
