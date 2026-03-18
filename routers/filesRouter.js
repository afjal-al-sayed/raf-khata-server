const express = require("express");
const { generateUploadUrl } = require("../controllers/filesController");
const {
  requireBodyParams,
} = require("../middlewares/requireBodyParamsMiddleware");
const router = express.Router();

router.post(
  "/generate-upload-url",
  requireBodyParams(["fileName"]),
  generateUploadUrl
);

module.exports = router;
