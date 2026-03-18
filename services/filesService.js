const { SUPABASE_BUCKET_NAME, SUPABASE_URL } = require("../config/env");
const supabase = require("../config/supabaseClient");
const { createError } = require("../utils/errorManager");
const { generateNewShortId } = require("../utils/uniqueIdHandler");
const { getBucketById } = require("../services/bucketService");

exports.generateSignedUploadUrl = async (fileName) => {
  const filePath = `uploads/${Date.now()}_${fileName}`;

  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .createSignedUploadUrl(filePath);

  if (error) {
    console.error(error);
    createError(404, "Unable to generate upload URL.");
  }

  return {
    uploadUrl: data.signedUrl,
    path: filePath,
  };
};

exports.generateSignedDownloadUrl = async (filePath, expiresIn = 300) => {
  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    console.error(error);
    createError(404, "Unable to generate download URL.");
  }

  return data.signedUrl;
};

exports.createFileList = async (req, bucketId) => {
  const fileList = req.body?.fileList || [];

  if (!bucketId) return generateFileListWithUniqueIds(fileList);

  const dbBucket = await getBucketById(bucketId);
  const reservedIds = dbBucket.fileList?.map((item) => item.fileShortId) || [];

  return generateFileListWithUniqueIds(fileList, reservedIds);
};

const generateFileListWithUniqueIds = (fileList, reservedIds = []) => {
  const fileListWithUniqueIds = fileList.map((item) => ({
    name: item.name, // first one which is saved to DB, item. one which is passed from the frontend
    path: item.path,
    size: item.size,
    fileShortId: generateNewShortId(reservedIds),
  }));
  return fileListWithUniqueIds;
};
