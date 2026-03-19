const mongoose = require("mongoose");
const { SESSION_DURATION } = require("../config/env");
const { generateNewShortId } = require("../utils/uniqueIdHandler");

const textSchema = new mongoose.Schema(
  {
    title: String,
    text: {
      type: String,
      required: [true, "Can't add empty text into bucket."],
      trim: true,
    },
    textShortId: {
      type: String,
      required: true,
      default: () => generateNewShortId(),
    },
  },
  {
    timestamps: true,
  }
);

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "File must have a name along with extension."],
      trim: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    fileShortId: {
      type: String,
      required: true,
      default: () => generateNewShortId(),
    },
  },
  {
    timestamps: true,
  }
);

const bucketSchema = new mongoose.Schema(
  {
    bucketShortId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateNewShortId(),
    },
    bucketName: String,
    expiresAfter: {
      // seconds
      type: Number,
      default: SESSION_DURATION,
      requried: true, // 6 hrs
    },
    textList: [textSchema],
    fileList: [fileSchema],
  },
  {
    timestamps: true,
  }
);

// this lies on query (for example findOne().isStillValid()
bucketSchema.query.isStillValid = function () {
  const now = new Date();
  return this.find({
    $expr: {
      $gt: [
        { $add: ["$createdAt", { $multiply: ["$expiresAfter", 1000] }] },
        now,
      ],
    },
  });
};

// this lies on object (exm: const obj = await findOne(); then, obj.hasExpired())
bucketSchema.methods.isExpired = function () {
  const now = new Date();
  const deathTime = this.createdAt.getTime() + this.expiresAfter * 1000;
  return now.getTime() > deathTime;
};

const Bucket = mongoose.model("Bucket", bucketSchema);

module.exports = Bucket;
