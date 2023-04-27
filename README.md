# archivos-rojos

This is an API project that supports MySQL database. The project contains the following npm scripts:

- start: Starts the API server in production mode by running the index.js file using the node command.
- dev: Starts the API server in development mode by running the index.js file using nodemon, which automatically restarts the server when changes are made to the source code.
- test: Runs the Jest test suite in verbose mode, using the --rootDir flag to specify the test directory.
To use this project, you will need to set the following environment variables:

Create a .env file at the root level

- CONNECTION_TYPE: The type of database connection to use. Only mysql is supported by this project.
- USER: The username to use to connect to the database.
- HOST: The hostname of the database server.
- DATABASE: The name of the MySQL database to use.
- PASSWORD: The password to use to connect to the database.
- PORT: The port number to use to connect to the database.
- CONNECTION_LIMIT: The maximum number of connections to allow in the MySQL connection pool.
- PORT: The port number to use for the API server.

To start the API server, run the following command:
`npm start`

To start the API server in development mode, run the following command:
`npm run dev`

To run the test suite, run the following command:
`npm test`

Note: Please make sure to install all the dependencies mentioned in package.json before starting the API. You can install them by running the following command:

`npm install`
