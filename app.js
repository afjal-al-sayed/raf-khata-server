const express = require("express");
const {
  errorHandlerMiddleware,
} = require("./middlewares/errorHandlerMiddleware.js");
const bucketRouter = require("./routers/bucketRouter.js");

const app = express();
app.use(express.json());

app.use("/api/buckets", bucketRouter);

app.use(errorHandlerMiddleware);

module.exports = app;
