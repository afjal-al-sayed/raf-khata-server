const Bucket = require("../models/bucketModel");
const { getBucketById } = require("../services/bucketService");
const { createError } = require("../utils/errorManager");
const { generateNewShortId } = require("../utils/uniqueIdHandler");

exports.addNewText = async (req, res, next) => {
  try {
    const bucketId = req.params.bucketId;
    const textContent = req.body?.text?.trim();
    if (!textContent) createError(400, "Text content cannot be empty.");

    const dbBucket = await getBucketById(bucketId);

    let newTextShortId;
    while (true) {
      newTextShortId = generateNewShortId();
      const alreadyHasThisShortId = dbBucket.textList.find(
        (text) => text.textShortId === newTextShortId
      );
      if (!alreadyHasThisShortId) break;
    }

    const newText = {
      text: textContent,
      textShortId: newTextShortId,
    };
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
    const textContent = req.body?.text?.trim();
    if (!textContent) createError(400, "Text content cannot be empty.");

    await getBucketById(bucketId); // for checking if bucket exists and also the bucket is not expired.

    const result = await Bucket.updateOne(
      {
        bucketShortId: bucketId,
        "textList.textShortId": textId,
      },
      {
        $set: {
          "textList.$.text": textContent,
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
