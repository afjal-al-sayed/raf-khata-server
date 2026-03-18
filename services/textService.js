const { generateNewShortId } = require("../utils/uniqueIdHandler");
const { getBucketById } = require("../services/bucketService");
const { createError } = require("../utils/errorManager");

exports.createTextList = async (req, bucketId) => {
  const textList = req.body?.textList || [];
  // this is when a textList need to be created before creating a bucket.
  if (!bucketId) return generateTextListWithUniqueIds(textList);

  const dbBucket = await getBucketById(bucketId);

  const reservedIds = dbBucket.textList?.map((item) => item.textShortId) || [];

  return generateTextListWithUniqueIds(textList, reservedIds);
};

const generateTextListWithUniqueIds = (textList, reservedIds = []) => {
  console.log(generateNewShortId(reservedIds));
  const textListWithUniqueIds = textList.map((item) => ({
    text: item.text, // first one which is saved to DB, item. one which is passed from the frontend
    title: item.title,
    textShortId: generateNewShortId(reservedIds),
  }));
  return textListWithUniqueIds;
};
