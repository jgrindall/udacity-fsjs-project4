# Introduction

This project contains the client (Angular) and server (Nodejs) for a simple shopping website.

The client-side is based off the work done in part 2 of the nanodegree (https://github.com/jgrindall/udacity-fsjs-project3)

- The built html/css/js files are hosted on Amazon S3.
- The Nodejs application is hosted on Amazon EB.
- The database (Postgres) is hosted on Amazon RDS.
- The CI pipeline is configured using circle ci. It contains some (very) rudimentary tests and then compiles and deploys to Amazon.

The working application is found at this address:

[http://jgrindalludacity.s3.us-west-2.amazonaws.com/index.html](http://jgrindalludacity.s3.us-west-2.amazonaws.com/index.html)



Note 'http' - https is not configured.

![Screenshot](/docs/images/app1.png)
![Screenshot](/docs/images/app2.png)
![Screenshot](/docs/images/app3.png)

-----

# Client

#### Functionality

- The users's shopping cart is held in local storage if they are not logged in.

- Once they log in it will be synced with the database.

- Any api calls to the 'cart' are protected by a JWT.

- Users can edit their cart and then log in when they want to checkout, or they can log in first and edit their cart.

#### Tests

- Rudimentary Angular tests are located in these files:

    - [client/src/app/app.component.spec.ts](/client/src/app/app.component.spec.ts)
    - [client/src/app/auth.service.spec.ts](/client/src/app/auth.service.spec.ts)
    - [client/src/app/cart.service.spec.ts](/client/src/app/cart.service.spec.ts)
    - [client/src/app/products.service.spec.ts](/client/src/app/products.service.spec.ts)

- These can be run locally using "ng test"

- These are also configured to run in circle ci but the step is commented out - I have managed to get all the chrome headless dependencies installed but I cannot get the tests to run in circleci. See also: https://stackoverflow.com/questions/60304251/unable-to-open-x-display-when-trying-to-run-google-chrome-on-centos-rhel-7-5

#### API

- API calls are made to the following:

    - http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/api (prod)
    - http://localhost:3000/api (dev)

#### To compile and run locally:

- "cd client"
- "ng serve"	 	 
- ng test (optional)



-----

# Server

- API
   
   
   | endpoint               	| method 	| description          	|
   |------------------------	|--------	|----------------------	|
   | api/users/auth         	| POST   	| Authenticate a user  	|
   | api/products           	| GET    	| get all products     	|
   | api/products/:id       	| GET    	| get specific product 	|
   | api/cart/user/:user_id 	| GET    	| get user's cart      	|
   | api/cart/user/:user_id 	| POST   	| update user's cart   	|
    

#### Authentication
    
- Passwords are encrypted using bcryptjs
- Any endpoint that accesses a user's cart is protected by JWT. 
- See also
    - [/server/src/handlers/middleware/auth.ts](/server/src/handlers/middleware/auth.ts)
          

#### Configuration

- Environment variables exist for the following:
    - jwt secret key
    - bcryptjs and #salt for password hashing. Note that the library used is bcryptjs (which is pure JS and needs no CI compile steo) not bcrypt
    - postgres user/pwd/database names

- These are stored as
    - environment variables in elastic beanstalk (prod)
    - Or in the file server/.env file (dev)

#### Tests

- Some very simple tests are written using jasmine. See the folder /server/spec


#### Running locally:

- To compile and run locally:

	- "cd server"
	- "npm i"
	- "npm run build"
	- "npm run prod"
	- npm run test (optional))
	
- Note: Each time the app is started it wipes all database tables and starts from fresh (creating 3 default products and one user).


-----

# Database schema

#### product
- id
- title
- description
- fullDescription
- image
- category


#### user
 - id
 - password (hashed)
 - username
 
 
#### cart
 - id
 - user_id (references user.id)
 
 
#### cart_items
 - id
 - cart_id (references cart.id)
- product_id (reference product.id)
- count 

-----

# CI/Deployment

See:
 
[/docs/DEPLOY.md](/docs/DEPLOY.md)