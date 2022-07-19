
## BACKEND SIDE

### Technology tools for this Project
* Server side Framework : **Node js Express**
* Linting Library: **ESLint**
* documentation: **Swagger**
* Unit testing tools: **Mocha and Chai**
* Database: **PostgresSQL**

### Setup project locally

* Install [git](https://git-scm.com/downloads)
* Install [Node js](https://nodejs.org/en/)
* Clone Repo [SLUUCORP](https://github.com/sluucorp/Startup-project.git)

## Step to run backend locally
$ Move into backend folder
```
$ cd backend
```
Add the following environment valiables example:

```
  PORT,NODE_ENV,DATABASE_URL,TEST_URL,JWT_SECRET
```
Install dependincies in package.json file by:

```
$ npm install
```
To start the server in development mode

```
$ npm run dev
```
## TEST API

```
$ npm run test
```
## Documenting Api
Check the port our server running on local like 3000 or 4000  port depends on user choice
```
$ http://localhost:3000/api/v1/api-docs/
```

