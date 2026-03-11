const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  errorHandlerMiddleware,
} = require("./middlewares/errorHandlerMiddleware.js");
const bucketRouter = require("./routers/bucketRouter.js");
const {
  sessionHandlerMiddleware,
} = require("./middlewares/sessionHandlerMiddleware.js");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.0.109:5173"],
    credentials: true, // only if using cookies
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(sessionHandlerMiddleware);

app.use("/api/buckets", bucketRouter);

app.use(errorHandlerMiddleware);

module.exports = app;
