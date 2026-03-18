const { SUPABASE_BUCKET_NAME, SUPABASE_URL } = require("../config/env");
const supabase = require("../config/supabaseClient");
const { createError } = require("../utils/errorManager");

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
