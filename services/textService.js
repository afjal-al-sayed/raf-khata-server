const { generateNewShortId } = require("../utils/uniqueIdHandler");
const { getBucketById } = require("../services/bucketService");
const { createError } = require("../utils/errorManager");

exports.createNewText = async (req, bucketId) => {
  const { text } = req.requiredBodyParams;
  let newTextShortId = generateNewShortId();
  // this is when a text need to be created before creating a bucket.
  if (!bucketId) {
    return {
      text: text,
      textShortId: newTextShortId,
    };
  }

  const dbBucket = await getBucketById(bucketId);

  while (true) {
    const alreadyHasThisShortId = dbBucket.textList.find(
      (text) => text.textShortId === newTextShortId
    );
    if (!alreadyHasThisShortId) break;
    newTextShortId = generateNewShortId();
  }

  const newText = {
    text: text,
    textShortId: newTextShortId,
  };

  return newText;
};
