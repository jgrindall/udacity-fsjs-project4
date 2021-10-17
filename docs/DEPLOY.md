# AWS services

#### RDS

The database can be found at:

- udacity1.c7wd8ws5gdn8.us-west-2.rds.amazonaws.com
- on port 5432.

![Screenshot](/docs/images/rds1.png)

![Screenshot](/docs/images/rds2.png)

It's availability in pgAdmin is shown below:

![Screenshot](/docs/images/rds3.png)


----

#### EB

-The eb environment is called 'jgrindalludacity-dev' and it is available here:

- [http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/](http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/)


-Hitting the endpoint "/" just echoes the number of users and products in the database.

![Screenshot](/docs/images/eb1.png)
![Screenshot](/docs/images/eb2.png)
![Screenshot](/docs/images/eb4.png)

Environment variables are made accessible to node and are configured here:

![Screenshot](/docs/images/eb3.png)


- The EB configuration can be found here:

[/server/.elasticbeanstalk/config.yml](/server/.elasticbeanstalk/config.yml)

This file contains the settings for the environment to use, the region and the IAM profile.

----

#### S3

The S3 bucket is called "jgrindalludacity"

![Screenshot](/docs/images/s3_1.png)

It has a bucket policy as shown:

![Screenshot](/docs/images/s3_2.png)


----

#### IAM user

There is one IAM user with profile called "deploy_cli"

![Screenshot](/docs/images/iam.png)



----

# circleci pipeline

#### github
Circle ci is connected to the github account https://github.com/jgrindall/

![Screenshot](/docs/images/ci2.png)

Pushing to master on the repo "udacity-fsjs-project4" triggers a build.

Secret keys are configured in circleci:

![Screenshot](/docs/images/ci1.png)



#### Pipline details

- The main config file is found here: [/.circleci/config.yml](/.circleci/config.yml)    

The steps are as follows:


Create architecture diagram

https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StartInstance.html
https://circleci.com/developer/orbs/orb/ware2go/aws-rds
https://stackoverflow.com/questions/69259774/error-notauthorizederror-operation-denied-on-aws-eb-init
https://aws.amazon.com/premiumsupport/knowledge-center/ec2-not-auth-launch/
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-ssh.html
https://serverfault.com/questions/770749/node-path-on-elastic-beanstalk
https://medium.com/@shivam_g10/deploying-a-node-js-application-to-aws-elastic-beanstalk-through-cli-b60385ed010f
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html

