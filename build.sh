#!/bin/bash

mvn clean install

cp target/smartata.war /opt/tomcat/webapps/
