const express = require("express");
const {
  generateUploadUrl,
  generateDownloadUrl,
} = require("../controllers/filesController");
const {
  requireBodyParams,
} = require("../middlewares/requireBodyParamsMiddleware");
const router = express.Router();

router.post(
  "/generate-upload-url",
  requireBodyParams(["fileName"]),
  generateUploadUrl
);

router.post(
  "/generate-download-url",
  requireBodyParams(["filePath"]),
  generateDownloadUrl
);

module.exports = router;
