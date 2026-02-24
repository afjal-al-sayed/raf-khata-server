const dns = require("node:dns").promises;
dns.setServers(["1.1.1.1", "1.0.0.1"]);

require("dotenv").config();

const connectDatabase = require("./config/db.js");
const app = require("./app.js");

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

console.log(MONGO_DB_URI);

async function startServer() {
  await connectDatabase(MONGO_DB_URI);
  app.listen(PORT, () => {
    console.log("server started.....");
  });
}

startServer();
