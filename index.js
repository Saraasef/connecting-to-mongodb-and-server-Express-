const Application = require("./app/Server");
const DB_URL = "mongodb://localhost:27017/projectmanagementDB";
require("dotenv").config();
new Application(3001, DB_URL);
