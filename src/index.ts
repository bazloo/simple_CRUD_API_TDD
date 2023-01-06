//import app from './app';

import User from "./database/User";
import Database from "./database/Database";

const user = new User();
const db = new Database(user);

console.log(db);

// const port = 3000;
//
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });
