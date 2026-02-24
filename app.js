const express = require("express");
const cookieParser = require("cookie-parser");
const {
  errorHandlerMiddleware,
} = require("./middlewares/errorHandlerMiddleware.js");
const bucketRouter = require("./routers/bucketRouter.js");
const {
  sessionHandlerMiddleware,
} = require("./middlewares/sessionHandlerMiddleware.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(sessionHandlerMiddleware);

app.use("/api/buckets", bucketRouter);

app.use(errorHandlerMiddleware);

module.exports = app;
