package com.neotys.selenium.client;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.util.Optional;

public class UshahidiBasicTest extends TestBase {

    private String baseUrl;

    @BeforeClass
    public static void beforeClass() {
        TestBase.beforeClass();
    }

    @Before
    public void setup() {
        super.setup();

        baseUrl = "http://ushahidi";
    }

    @Test
    public void testPost() throws Exception { // flakey due to Sleeps and responsive app (but not test) design

        setScriptName(UshahidiBasicTest.class.getName()+".testPost");

        driver.get(baseUrl + "/views/map");

        driver.findElement(By.cssSelector("button.button-alpha.button-fab")).click();
        driver.findElement(By.xpath("//div[@id='bootstrap-app']/ng-view/div/main/div/post-toolbar/div/div/ul/li[1]/a/span[2]")).click();

        driver.findElement(By.id("title")).sendKeys("My new event");
        driver.findElement(By.id("content")).sendKeys("it's a new event");
        selectOptionByVisibleText("Wild Fire");

        startTransaction("Geosearch");

        driver.findElement(By.xpath("//input[@ng-model='searchLocationTerm']")).sendKeys("Boston");
        driver.findElement(By.cssSelector("button.btn.btn-info")).click();

        startTransaction("Submit");
        Thread.sleep(1000);
        driver.findElement(By.xpath("(//button[@type='submit'])[2]")).click();
        Thread.sleep(1000);

        startTransaction("Back to map");
        driver.findElement(By.cssSelector("svg.iconic")).click();
    }

    private void selectOptionByVisibleText(String optionText) {
        Optional<WebElement> select = driver.findElements(By.xpath("//select")).stream()
                .filter(we -> (new Select(we)).getOptions().stream()
                        .anyMatch(o -> optionText.equalsIgnoreCase(o.getText()))).findFirst();
        if(select.isPresent())
            (new Select(select.get()))
                .selectByVisibleText(optionText);
    }

    @After
    public void teardown() {
        if (driver != null) {
            stopTransaction();
            driver.quit();
        }
    }

}
