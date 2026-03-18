const { generateSignedUploadUrl } = require("../services/filesService");

exports.generateUploadUrl = async (req, res, next) => {
  try {
    const { fileName } = req.requiredBodyParams;
    const { uploadUrl, path, publicUrl } = await generateSignedUploadUrl(
      fileName
    );

    return res.status(200).json({
      uploadUrl: uploadUrl,
      path: path,
      publicUrl: publicUrl,
    });
  } catch (err) {
    next(err);
  }
};
