var pop = context.currentVU.getPopulationName()

var ignoreErrorsCommandLineArg = "--neoloadDebug";
if(pop != null && !pop.toLowerCase().indexOf('check-')==0) ignoreErrorsCommandLineArg = "";

context.variableManager.setValue("ignoreErrorsCommandLineArg",ignoreErrorsCommandLineArg);