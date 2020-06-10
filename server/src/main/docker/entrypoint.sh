#!/bin/sh
set -e
echo "---------------------------------OPTS------------------------------------"
echo "JAVA_OPTS="$JAVA_OPTS
echo "PORT="$PORT
echo "-------------------------------------------------------------------------"

java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar ./app.jar