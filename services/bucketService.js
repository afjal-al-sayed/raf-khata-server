const Bucket = require("../models/bucketModel");
const { createError } = require("../utils/errorManager");

exports.getBucketById = async (bucketId) => {
  const dbBucket = await Bucket.findOne({
    bucketShortId: bucketId,
  });
  if (!dbBucket) {
    // no bucket with this id;
    createError(404, "Bucket Not Found.");
  }
  if (dbBucket.isExpired()) {
    createError(404, "Bucket is Expired.");
  }
  //console.log(dbBucket);
  //   is valid is basically returing matching array
  //return dbBucket && dbBucket.length > 0 ? dbBucket[0] : null;
  return dbBucket;
};
