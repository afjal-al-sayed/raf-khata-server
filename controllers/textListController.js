const Bucket = require("../models/bucketModel");
const { getBucketById } = require("../services/bucketService");
const { createNewText } = require("../services/textService");
const { createError } = require("../utils/errorManager");

exports.addNewText = async (req, res, next) => {
  try {
    const bucketId = req.params.bucketId;

    const newText = await createNewText(req, bucketId);

    await Bucket.updateOne(
      { bucketShortId: bucketId },
      { $push: { textList: newText } }
    );

    const updatedBucket = await getBucketById(bucketId);

    return res.status(201).json({
      data: updatedBucket,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateText = async (req, res, next) => {
  try {
    const { bucketId, textId } = req.params;
    const { text } = req.requiredBodyParams; // already purified by middleware
    await getBucketById(bucketId); // for checking if bucket exists and also the bucket is not expired.

    const result = await Bucket.updateOne(
      {
        bucketShortId: bucketId,
        "textList.textShortId": textId,
      },
      {
        $set: {
          "textList.$.text": text,
        },
      }
    );

    if (result.matchedCount === 0)
      createError(404, "Text with given shortId doesn't exist.");

    const updatedBucket = await getBucketById(bucketId);
    return res.status(201).json({
      data: updatedBucket,
    });
  } catch (err) {
    next(err);
  }
};
