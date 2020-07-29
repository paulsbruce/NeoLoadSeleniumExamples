package com.neotys.selenium.client;

import org.apache.commons.cli.*;
import org.junit.runner.JUnitCore;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class TestsRuntime {

    private HashMap<String,Object> _capabilities;
    private URL _wdHubUrl;

    public TestsRuntime() {
        _capabilities = getDefaultCapabilities();
        try { this.setHubUrl("http://localhost:4444/wd/hub"); } catch(Exception e) { }
    }

    public HashMap<String,Object> getCapabilities() {
        return _capabilities;
    }

    private HashMap<String, Object> getDefaultCapabilities() {
        HashMap<String, Object> ret = new HashMap<>();
        ret.put("browserName","firefox");
        return ret;
    }

    public void setHubUrl(String wdHubUrl) throws Exception {
        this._wdHubUrl = new URL(wdHubUrl);
    }

    public URL getHubUrl() { return this._wdHubUrl; }

    public static TestsRuntime fromArgs(String[] args) {
        Options options = new Options();
        options.addOption("g","gridUrl",false,"A full url to the /wd/hub address of the Selenium grid.");
        options.addOption("b","browser",true,"The browser to use");
        options.addOption("h","headless",false,"Run the browser headless (or not)");
        options.addOption("c","neoloadHost",true,"NeoLoad Controller host/IP (Data Exchange API)");
        options.addOption("p","neoloadPort",true,"NeoLoad Controller port (Data Exchange API)");
        options.addOption("m","neoloadMode",true,"NeoLoad mode (Design or EndUserExperience)");
        options.addOption("d","debug",false,"Run tests in debug mode");
        CommandLineParser parser = new DefaultParser();
        HelpFormatter formatter = new HelpFormatter();

        try
        {
            CommandLine cmd = parser.parse(options, args);

            TestsRuntime rt = new TestsRuntime();
            if(cmd.hasOption("g")) rt.setHubUrl(cmd.getOptionValue("g"));

            if(cmd.hasOption("m")) rt.getCapabilities().put("neoload:mode", cmd.getOptionValue("m"));
            if(cmd.hasOption("c")) rt.getCapabilities().put("neoload:host", cmd.getOptionValue("c"));
            if(cmd.hasOption("p")) rt.getCapabilities().put("neoload:port", cmd.getOptionValue("p"));
            if(cmd.hasOption("m")) rt.getCapabilities().put("neoload:location", "java");
            if(cmd.hasOption("m")) rt.getCapabilities().put("neoload:w3cEventTypes", "mark|measure|paint|longtask|frame|navigation|resource".split("\\|"));
            if(cmd.hasOption("d")) rt.getCapabilities().put("neoload:debug", true);

            String browser = cmd.hasOption("b") ? cmd.getOptionValue("b") : "firefox";
            rt.getCapabilities().put("browserName", browser);

            boolean isFF = browser.equalsIgnoreCase("firefox");
            boolean isCh = browser.equalsIgnoreCase("chrome");
            if(cmd.hasOption("h")) {
                if(isFF) rt.getCapabilities().put("moz:firefoxOptions", new HashMap<String,Object>() {{
                    put("args", new ArrayList<String>(Arrays.asList("-headless")));
                }});
                //{ args: ['-headless'] }
                if(isCh) rt.getCapabilities().put("goog:chromeOptions", new HashMap<String,Object>() {{
                    put("args", new ArrayList<String>(Arrays.asList("--headless")));
                }});
            }

            return rt;

        }
        catch (ParseException ex)
        {
            System.out.println(ex.getMessage());
            formatter.printHelp(Main.class.getCanonicalName(), options);
            System.exit(1);
        }
        catch (Exception ex)
        {
            System.out.println(ex.getMessage());
            System.exit(2);
        }

        return null;
    }
}
