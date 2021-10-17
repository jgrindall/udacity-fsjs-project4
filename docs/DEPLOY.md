#Introduction

####circleci config
    
- See /.circleci/config.yml
[config.yml](/.circleci/config.yml)    


####AWS RDS



####AWS EB



####AWS S3


####IAM user

![Screenshot](/docs/images/iam.png)




####Build

![Screenshot](/docs/images/build.png)



	Connect your GitHub repo to CircleCI
	
	Trigger a successful pipeline on each push to the main branch

	A screenshot of the last build shows that the student’s CircleCi account is authorized
	to access his/her repo
	on Github and is detecting changes each time he/she is pushing to the main branch.
	
	All the secrets found in the application are configured
	inside CircleCi and passed to the production application.
	
	Comments help explain the flow of the pipeline and are straight to the point.


AWS

	Include screenshots of the configuration page of your AWS services

	Document the infrastructure needs (RDS, S3 Elastic Beanstalk, etc) and explain the different steps in the pipeline

	Create architecture diagrams for an overview of the infrastructure and the pipeline

	Screenshots of the AWS console indicate that the following services are properly set up, i.e. healthy and accessible:






Docs folder to include

	architecture diagram. (arrows between services).

	more detailed documentation files on infrastructure description, app dependencies, and pipeline process

	deployment Process

	Infrastructure description
		App dependencies
		Pipeline process
		Prepare an architecture diagram to document the deployment flow


	Simple diagram giving a overview of the infrastructure and another diagram showing the overview of the pipeline.








https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StartInstance.html
https://circleci.com/developer/orbs/orb/ware2go/aws-rds
https://stackoverflow.com/questions/69259774/error-notauthorizederror-operation-denied-on-aws-eb-init
https://aws.amazon.com/premiumsupport/knowledge-center/ec2-not-auth-launch/
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-ssh.html
https://serverfault.com/questions/770749/node-path-on-elastic-beanstalk
https://medium.com/@shivam_g10/deploying-a-node-js-application-to-aws-elastic-beanstalk-through-cli-b60385ed010f
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html

