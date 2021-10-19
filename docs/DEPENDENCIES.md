# Dependencies

#### server

- nodejs  - v14+
- npm - v6.14 / yarn equivalent
- tsc - 4.0

packages:

    - typescript - v4.4
    - jasmine - v3.6
    - dotenv - v10.0
     -bcryptjs - v2.4
    - cors - v2.8
    - express - v4.17
    - jsonwebtoken - v8.5
    - pg - v8.5


#### client

- nodejs  - v14+
- npm - v6.14 / yarn equivalent
- tsc - 4.0

packages:

    - angular - v12
    - angular/route - v12
    - moment
    - typescript - v4.3
    - rxjs - v6.6
    - angularcli - v12.2
    - jasmine  - v3.8
    - karma - v6.3
 
#### CI

- circle ci - v2.1
    - orbs:
        - node: circleci/node@4.7
        - aws-cli: circleci/aws-cli@1.3.1
        - eb: circleci/aws-elastic-beanstalk@1.0.0
        - browser-tools: circleci/browser-tools@1.2.3
   
The pipeline will install

- google-chrome
- chromedriver
- awsebcli


#### AWS
 - EB instance: 
    - t2.micro
    - Node.js 14 running on 64bit Amazon Linux 2/5.4.6
    
- IAM
    - profile-name: deploy-cli  
    - AmazonEC2FullAccess
    - AmazonS3FullAccess
    - AdministratorAccess-AWSElasticBeanstalk
    
- S3 bucket
    - Public read allowed
    - Static website hosting enabled

- RDS
    - us-west-2
    - db.t3.micro
    - Engine: PostgreSQL


#### local database

 - postgres v13.3+ (https://www.postgresql.org/)
 - pgadmin v4+ (optional)
 - Database called 'udacity_fsjs_project4'
 - User configured according to .env file.
 
