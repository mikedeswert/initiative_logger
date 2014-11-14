#!/bin/bash
# Setup of Java and Tomcat on the Raspberry Pi
# Execute this file on a Raspberry Pi to setup a deployment environment

# Java should already be installed but let us make sure it is Java 8 and correctly updated
sudo apt-get install oracle-java8-jdk
sudo apt-get update

# Download and unzip Tomcat 8 to the tools directory
tomcathome=~/tools
tomcat=apache-tomcat-7.0.57
tomcattar=$tomcat.tar.gz

mkdir $tomcathome

## Cleanup
rm -f $tomcathome/$tomcattar
rm -rf $tomcathome/$tomcat

wget http://apache.cu.be/tomcat/tomcat-7/v7.0.57/bin/$tomcattar -P $tomcathome
tar xzf $tomcathome/$tomcattar -C $tomcathome

# Modify Tomcat configuration using sed
sudo apt-get install sed

sed -i 's/<\/tomcat-users>/<role rolename="admin" \/>\'$'\n<\/tomcat-users>/g' $tomcathome/$tomcat/conf/tomcat-users.xml
sed -i 's/<\/tomcat-users>/<role rolename="manager" \/>\'$'\n<\/tomcat-users>/g' $tomcathome/$tomcat/conf/tomcat-users.xml
sed -i 's/<\/tomcat-users>/<role rolename="manager-gui" \/>\'$'\n<\/tomcat-users>/g' $tomcathome/$tomcat/conf/tomcat-users.xml
sed -i 's/<\/tomcat-users>/<role rolename="manager-script" \/>\'$'\n<\/tomcat-users>/g' $tomcathome/$tomcat/conf/tomcat-users.xml
sed -i 's/<\/tomcat-users>/<user username="system" password="raspberry" roles="admin,manager,manager-gui,manager-script" \/>\'$'\n<\/tomcat-users>/g' $tomcathome/$tomcat/conf/tomcat-users.xml

echo -e "[\e[32msuccess\e[39m] setup was completed successfully"

sudo $tomcathome/$tomcat/bin/startup.sh
