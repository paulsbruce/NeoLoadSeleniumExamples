package com.neotys.selenium.client;

import org.apache.commons.cli.*;
import org.junit.runner.JUnitCore;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class Main {

    private static String[] savedArgs;
    public static String[] getArgs() {
        return savedArgs;
    }

    public static void main(String[] args) {
        savedArgs = args;
        //JUnitCore.main(args);
        JUnitCore.runClasses(UshahidiBasicTest.class);
    }

}
