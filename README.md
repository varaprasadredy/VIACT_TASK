# NodeJS Application for Users.
## Description
It is simple Users creation application.

## Features
- You can create, update, delete and get users in User Table.
- API Documentation available with Swagger.
- Have a data access layer for User model with get the User table. It helps to avoid the duplications of User model functions.
- Available authentication feature for User endpoints.
- You can change Token Expiry time dynamically in .ENV file
- Reusable DB connection file available(i.s in Utility) for any relational database

## Installation

Install the devDependencies and start the server with below commands.

```sh
cd VIACT_TASK
npm install
npm start
```

For development environments file provide below details

```sh
#Stage
NODE_ENV='development'
API_PORT= 3012

#DB Values
DB_NAME='test_users_db'
DB_HOST='localhost'
DB_USERNAME='user1'
DB_PASSWORD='password1'
#JWT Values
JWT_REFRESH_SECRET= 'VIACT'
EXPIRY_TIME='15m'
```

## API Documentation

Link: http://localhost:3012/api-docs/

## Note
- Create .ENV file before you use/run the application
- Provide required (i.e DB, JWT and PORT) details in .ENV before you run the application.
