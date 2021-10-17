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



![Screenshot](/docs/images/eb1.png)
![Screenshot](/docs/images/eb2.png)

-Hitting the endpoint "/" just echoes the number of users and products in the database.

![Screenshot](/docs/images/eb3.png)

Environment variables are made accessible to node and are configured here:

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

I use the following orbs:

- node: circleci/node@4.7
-   aws-cli: circleci/aws-cli@1.3.1
 -  eb: circleci/aws-elastic-beanstfalk@1.0.0
- browser-tools: circleci/browser-tools@1.2.3 (for running chrome headless tests in Angular)
                                                

The steps are as follows:



<table>
<thead><tr><td>Step</td><td>Details</td></tr></thead>
<tbody>

<tr><td>install node js</td><td></td></tr>
<tr><td>checkout code </td><td></td></tr>
<tr><td>install chrome and chrome driver</td><td></td></tr>
<tr><td>run "aws-cli/setup" </td><td>Required for the next steps. <pre>profile-name "deploy-cli"</pre>  </td></tr>
<tr><td>echo Hello World</td><td>sanity check   </td></tr>
<tr><td>echo versions of chrome and chrome driver. </td><td> Used when I was trying to get chrome headless to run.   </td></tr>
<tr><td>install some chrome headless dependencies</td><td></td></tr>
<tr><td>install awsebcli (Elastic Beanstalk CLI)</td><td>This uses python3 and pip3.<br/> <pre>> sudo apt-get install python3-pip python3-dev build-essential <br/>> sudo pip3 install awsebcli</pre></td></tr>
<tr><td>install node dependencies for the server.</td><td>See server/package.json. <br/><pre>> cd server && npm i</pre></td></tr>
<tr><td>compile the server code </td><td><pre>> npx tsc</pre>The tsconfig file is located at server/tsconfig.json</td></tr>
<tr><td> Run ls -alh   </td><td>Sanity check which files have been created in the 'dist' folder  </td></tr>

<tr><td>Create archive.zip</td><td><pre> > chmod +x archive.sh && ./archive.sh"</pre> <br/> The file archive.sh contains: <br/> <pre>zip -r archive.zip ./</pre><br/>I had some problems getting the 'dist' folder to upload correctly while still being in gitignore.<br/> This seems like the easiest solution.</td></tr>

<tr><td>Deploy zip to EB.</td><td><pre> > chmod +x deploy_aws.sh && ./deploy_aws.sh"</pre> <br/> The file deploy_aws.sh contains: <br/> <pre> eb deploy jgrindalludacity-dev --profile deploy-cli</pre></td></tr>
<tr><td>healthcheck  </td><td>Make a curl to eb.  Check if the response is 200, otherwise exit 1<br/> See server/healthcheck.sh </td></tr>

<tr><td>install dependencies for front end.  </td><td>See client/package.json. Angular, material desing, jasmine etc. </td></tr>
<tr><td>Front end tests   </td><td>"ng test" (commented out, not working)</td></tr>
<tr><td>Build front end      </td><td>ng build   </td></tr>
<tr><td>Deloy to S3   </td><td><pre>> chmod +x deploy_aws.sh && ./deploy_aws.sh</pre> <br/>  The file deploy_aws.sh contains: <br/>  <pre>bucketName=jgrindalludacity <br/>profileName=deploy-cli<br/>aws s3 rm s3://$bucketName --recursive --profile $profileName <br/>aws s3 cp --recursive --acl public-read ./dist/myApp s3://$bucketName/ --profile $profileName</pre></td></tr>

</tbody>

</table>

[![Alternate Text]({/docs/images/ci3.png})]({/docs/images/ci.mp4} "Video")

The latest build is shown in the video below:

[/server/.elasticbeanstalk/config.yml](/server/.elasticbeanstalk/config.yml)

[/docs/images/ci.mp4](/docs/images/ci.mp4)

[/docs/images/ci3.png](/docs/images/ci3.png)

<img src="https://raw.githubusercontent.com/jgrindall/udacity-fsjs-project4/master/docs/images/ci3.png"/>

<img src="/images/ci3.png"/>


<video markdown="0" controls poster="https://raw.githubusercontent.com/jgrindall/udacity-fsjs-project4/master/docs/images/ci3.png">
<source markdown="0" src="https://raw.githubusercontent.com/jgrindall/udacity-fsjs-project4/master/docs/images/ci.mp4" type="video/mp4">
</video>


<video markdown="0" controls poster="/docs/images/ci3.png">
<source markdown="0" src="/docs/images/ci.mp4" type="video/mp4">
</video>



