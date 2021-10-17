#!/bin/bash
STATUS=$( curl -s -o /dev/null -I -w "%{http_code}" http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/)
  echo $STATUS
if [ $STATUS -eq 200 ]; then
    exit 0
else
    exit 1
fi
