const express = require("express");
const {
  createNewBucket,
  getBucketById,
} = require("../controllers/bucketController");
const {
  requireBodyParams,
} = require("../middlewares/requireBodyParamsMiddleware");
const router = express.Router();
const textListRouter = require("./textListRouter.js");

router.use("/:bucketId/textList", textListRouter);

//router.get("/", getAllBuckets);
router.post("/", requireBodyParams(["text"]), createNewBucket);
router.get("/:bucketId", getBucketById);

module.exports = router;
