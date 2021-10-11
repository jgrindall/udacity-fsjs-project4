#!/bin/bash

aws s3 rm s3://jgrindalludacity --recursive --profile deploy-cli

aws s3 cp --recursive --acl public-read ./dist/myApp s3://jgrindalludacity/ --profile deploy-cli

