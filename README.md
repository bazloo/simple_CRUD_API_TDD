## Basic Description
This is a simple RESTful API built with Node.js that allows for CRUD (Create, Read, Update, and Delete) operations on a "user" entity. Developed for learning purposes as a task of the [RS-school](https://rs.school/) Node.js course.

## Details of Implementation
- Using a TDD approach, tests were written first and then the code was written to pass those tests.
- The server is built using the native Node.js HTTP module.
- The database is an in-memory implementation.
- The API can be horizontally scaled using the Node.js cluster module for improved performance.
- Tests include both unit and integration tests, using Jest.
- TypeScript is used as the primary language.

## How to Run
1. Clone the repository
2. Checkout to the `TASK-3-simple-crud-api` branch
3. Install dependencies by running `npm install`
4. Available Scripts:
    - `npm start` : start the server
    - `npm run build` : Clean the build folder and transpile the code
    - `npm run start:dev` : start the server with nodemon for development
    - `npm run start:prod` : Clean the build folder, transpile the code and start the server
    - `npm run start:multi` : Clean the build folder, transpile the code and start the server with the node.js cluster module
    - `npm run clean` : Clean the build folder
    - `npm run test` : run the tests with jest.
5. You can now send requests to the API at `http://localhost:4000`