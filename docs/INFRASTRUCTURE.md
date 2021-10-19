
       
    
# AWS infrastructure

#### RDS

The database can be found at:

- udacity1.c7wd8ws5gdn8.us-west-2.rds.amazonaws.com
- on port 5432.

![Screenshot](/docs/images/rds1.png)

![Screenshot](/docs/images/rds2.png)

It's availability in pgAdmin is shown below:

![Screenshot](/docs/images/rds3.png)


----





//TODO

Also add commit hash





#### EB

- The eb environment is called 'jgrindalludacity-dev' and it is available here:

- [http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/](http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/)



![Screenshot](/docs/images/eb1.png)
![Screenshot](/docs/images/eb2.png)

- Hitting the endpoint "/" just echoes the number of users and products in the database.

![Screenshot](/docs/images/eb3.png)

Environment variables are NOT configured in EB, rather they are passed in the deploy_aws section of the ci pipeline (set-env):

![Screenshot](/docs/images/eb4.png)


- The EB configuration can be found here:

[/server/.elasticbeanstalk/config.yml](/server/.elasticbeanstalk/config.yml)

This file contains:

- the settings for the environment to use
- the region
- the IAM profile (deploy_cli)
- the zip file to upload to eb (archive.zip)


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


# Infrastructure diagram

![Screenshot](/docs/images/aws.png)

