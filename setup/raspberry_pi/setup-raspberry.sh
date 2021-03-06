#!/bin/bash
# Setup of Java, Tomcat and MongoDB on the Raspberry Pi
# Execute this file on a Raspberry Pi to setup a deployment environment
#
# Please be aware that this shell script installs the following:
# 	- oracle-java8-jdk
#	- git
#	- sed

# Java should already be installed but let us make sure it is Java 8 and correctly updated
sudo apt-get install oracle-java8-jdk
sudo apt-get update

# Clone and instal @svvitale his mongo4pi
sudo apt-get install git
sudo git clone https://github.com/svvitale/mongo4pi.git $toolshome/mongo4pi
sudo chmod 755 $toolshome/mongo4pi/install.sh
cd $toolshome/mongo4pi
./install.sh

# Download and unzip Tomcat 8 to the tools directory
toolshome=~/tools
tomcat=apache-tomcat-7.0.57
tomcattar=$tomcat.tar.gz

mkdir $toolshome

## Cleanup
rm -f $toolshome/$tomcattar
rm -rf $toolshome/$tomcat

## Download and unzip
wget http://apache.cu.be/tomcat/tomcat-7/v7.0.57/bin/$tomcattar -P $toolshome
tar xzf $toolshome/$tomcattar -C $toolshome

# Modify Tomcat configuration using sed
sudo apt-get install sed

sed -i 's/<\/tomcat-users>/<role rolename="admin" \/>\'$'\n<\/tomcat-users>/g' $toolshome/$tomcat/conf/tomcat-users.xml
sed -i 's/<\/tomcat-users>/<role rolename="manager" \/>\'$'\n<\/tomcat-users>/g' $toolshome/$tomcat/conf/tomcat-users.xml
sed -i 's/<\/tomcat-users>/<role rolename="manager-gui" \/>\'$'\n<\/tomcat-users>/g' $toolshome/$tomcat/conf/tomcat-users.xml
sed -i 's/<\/tomcat-users>/<role rolename="manager-script" \/>\'$'\n<\/tomcat-users>/g' $toolshome/$tomcat/conf/tomcat-users.xml
sed -i 's/<\/tomcat-users>/<user username="system" password="raspberry" roles="admin,manager,manager-gui,manager-script" \/>\'$'\n<\/tomcat-users>/g' $toolshome/$tomcat/conf/tomcat-users.xml

echo -e "[\e[32msuccess\e[39m] setup was completed successfully"

sudo $toolshome/$tomcat/bin/startup.sh
