#!/bin/bash

mvn install

cp target/smartata.war /opt/tomcat/webapps/
