#!/bin/bash

bucketName=jgrindalludacity

profileName=deploy-cli

aws s3 rm s3://$bucketName --recursive --profile $profileName

aws s3 cp --recursive --acl public-read ./dist/myApp s3://$bucketName/ --profile $profileName

