#!/bin/sh
java -jar neotys-selenium-server-1.0-SNAPSHOT-all.jar -role node -hub http://localhost:4444 -proxy com.neotys.selenium.server.NeoLoadRemoteProxy

# -help for all options
