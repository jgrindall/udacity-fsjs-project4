#!/bin/bash

bucketName=jgrindalludacity

aws s3 rm s3://$bucketName --recursive

aws s3 cp --recursive --acl public-read ./dist/myApp s3://$bucketName/

