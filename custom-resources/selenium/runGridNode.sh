#!/bin/sh
java -jar neotys-selenium-server-all.jar -role node -hub http://localhost:4444 -proxy com.neotys.selenium.server.NeoLoadRemoteProxy

# -help for all options
