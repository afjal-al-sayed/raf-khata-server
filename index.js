const dns = require("node:dns").promises;
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const { PORT, MONGO_DB_URI } = require("./config/env.js");
const connectDatabase = require("./config/db.js");
const app = require("./app.js");

async function startServer() {
  await connectDatabase(MONGO_DB_URI);
  app.listen(PORT, () => {
    console.log("server started.....");
  });
}

startServer();
