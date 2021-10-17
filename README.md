#Introduction

This project contains the client (Angular) and server (Nodejs) for a simple shopping website.

The client-side is based off the work done in part 2 of the nanodegree (https://github.com/jgrindall/udacity-fsjs-project3)

- The built html/css/js files are hosted on Amazon S3.
- The Nodejs application is hosted on Amazon EB.
- The database (Postgres) is hosted on Amazon RDS.
- The CI pipeline is configured using circle ci. It contains some (very) rudimentary tests and then compiles and deploys to Amazon.

The working application is found at this address:

http://jgrindalludacity.s3.us-west-2.amazonaws.com/index.html

Note that https is not configured.

![Screenshot:](http://jgrindalludacity.s3.us-west-2.amazonaws.com/docs/images/app1.png)



#Running the app locally

- Build and start the server:

	- "cd server"
	- "npm i"
	- "npm run build"
	- "npm run prod"
	
	
- Run the angular app

	 - "cd client"
	 - "ng serve"	 


#Database



#Client

- tests


C:\workspace\udacity\course4\udacity-fsjs-project4\client\src\app\app.component.spec.ts
C:\workspace\udacity\course4\udacity-fsjs-project4\client\src\app\auth.service.spec.ts
C:\workspace\udacity\course4\udacity-fsjs-project4\client\src\app\cart.service.spec.ts
C:\workspace\udacity\course4\udacity-fsjs-project4\client\src\app\products.service.spec.ts


- API


- The users's shopping cart is held in local storage if they are not logged in.

- Once they log in it will be synced with the database.

- Any api calls to the 'cart' are protected by a JWT.

- Users can edit their cart and then log in when they want to checkout, or they can log in first and edit their cart.



#Server

.env
jasmine



#Deployment






Circleci

	.circleci/config.yml - config.yml that ensures the build occurs in a logical sequence.

	Screenshot of your last build
	
	Connect your GitHub repo to CircleCI
	
	Configure a CircleCI pipeline to automate your deployments

	Trigger a successful pipeline on each push to the main branch

	A screenshot of the last build shows that the student’s CircleCi account is authorized to access his/her repo
	on Github and is detecting changes each time he/she is pushing to the main branch.
	
	All the secrets found in the application are configured inside CircleCi and passed to the production application.
	
	Comments help explain the flow of the pipeline and are straight to the point.

	Configure secrets via the Continuous Integration software	

	A screenshot of the configuration screen is present to show where secrets were added.




AWS

	Include screenshots of the configuration page of your AWS services

	Document the infrastructure needs (RDS, S3 Elastic Beanstalk, etc) and explain the different steps in the pipeline

	Create architecture diagrams for an overview of the infrastructure and the pipeline

	Screenshots of the AWS console indicate that the following services are properly set up, i.e. healthy and accessible:

		AWS RDS for the database

		AWS ElasticBeanstalk (or alternatives like lambda) for the API

		AWS s3 for web hosting


A root level package.json

	Tests

	Builds



Readme with some basic documentation





Source code

	No environment variables in source code

	dotenv

	No authentication strings are hard-coded in the source code.





Docs folder to include

	architecture diagram. (arrows between services).

	more detailed documentation files on infrastructure description, app dependencies, and pipeline process

	deployment Process

	Pages on different topics that cannot be discovered by just quickly glancing at code:

	Infrastructure description
		App dependencies
		Pipeline process
		Prepare an architecture diagram to document the deployment flow


	Simple diagram giving a overview of the infrastructure and another diagram showing the overview of the pipeline.


* Cart -> Database

* documentation





