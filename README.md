# Posterr Server

## Development Setup

> **Installing Packages**

- After cloning or downloading the project, go to the root of the project and install dependencies with `yarn` or `npm`

```bash
$ yarn        # npm install
```

> **ESLint and Prettier**

This configuration is intended to be used with VSCode, other IDEs were not tested.

- Make sure to have the **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** extension installed and **not have** the **[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** installed, since the Prettier extensions might cause conflicts.
- Make sure to not have the `"editor.formatOnSave": true` configuration in your `settings.json` file.
- Make sure to restart VSCode after changing any of the above configurations.

> **Database**

- With docker installed, run `$ docker-compose up` on the root of the project and a postgres database should be created.
- The database can also be created without docker directly on the local machine as well, if prefarable.
- Make sure to have the file `ormconfig.json` proper configured with the connection variables.
- After creating the database (via docker or other method), a migration run is required so all the tables are created. The command `$ yarn typeorm migration:run` (or `$ npm run typeorm migration:run`) will create all the necessary database schema.

> **Dev Script**

- With the database already set up and running, run the `dev` script and the application should start.

```bash
$ yarn dev        # npm run dev
```

> **Tests**

The application has two types of tests: *Unit* and *Integration*.

- The *Unit* tests can be run without any extra effort since they run with a in-memory database. The idea of these tests are just to check the core business rules of the *useCases*.
- The *Integration* tests are more sophisticated tests that tests not only the *useCases* but also the endpoints, and they require a *tests* database in order to successfully run. The **name** of the test database can be found under the *index.ts* file, by default it's **posterr_testdb**. This database can be created manually with some GUI, by an SQL command like (`CREATE DATABASE posterr_testdb;`), or via docker.

Tests are specified under all `useCases` folders and have a prefix of `.spec.ts`.

To run all tests and generate a coverage page, just run:

```bash
$ yarn test        # npm run test
```

And wait until all tests are finished. A new folder will be generated under the root of the project called `coverage`. A HTML page is generated with the percentage of coverage of the useCases and can be accessed on `coverage/lcov-report/index.html`.

> **API Endpoints**

```http
# User Endpoints

// Create new User
POST /repositories 
Content-Type: application/json

{
  "username": "Cat"
}

// Get User
GET /user/cat 

// Follow User (User who is performing the action is the one in the header)
POST /user/follow/dog 
Header: { username: cat }

// Unfollow User (User who is performing the action is the one in the header)
POST /user/unfollow/dog 
Header: { username: cat }

# Post Endpoints

// Create new Post (User who is performing the action is the one in the header)
POST /post 
Content-Type: application/json
Header: { username: cat }

{
  "message": "Meow!"
}

// Repost (User who is performing the action is the one in the header)
POST /post/:postId/repost 
Header: { username: cat }

// Quote Post (User who is performing the action is the one in the header)
POST /post/:postId/quotePost
Header: { username: cat }

// List all Posts
GET /post

// List all Posts from Following (User who is performing the action is the one in the header)
GET /post/following
Header: { username: cat }

// List all Posts from yourself (User who is performing the action is the one in the header)
GET /post/self
Header: { username: cat }
```

