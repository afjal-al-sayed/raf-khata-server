const {
  generateSignedUploadUrl,
  generateSignedDownloadUrl,
} = require("../services/filesService");

exports.generateUploadUrl = async (req, res, next) => {
  try {
    const { fileName } = req.requiredBodyParams;
    const { uploadUrl, path } = await generateSignedUploadUrl(fileName);

    return res.status(200).json({
      uploadUrl: uploadUrl,
      path: path,
    });
  } catch (err) {
    next(err);
  }
};

exports.generateDownloadUrl = async (req, res, next) => {
  try {
    const { filePath } = req.requiredBodyParams;
    const downloadUrl = await generateSignedDownloadUrl(filePath);

    return res.status(200).json({
      downloadUrl: downloadUrl,
    });
  } catch (err) {
    next(err);
  }
};
