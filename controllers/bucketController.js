const Bucket = require("../models/bucketModel");
const { getBucketById } = require("../services/bucketService");
const { createNewText } = require("../services/textService");
const { createError } = require("../utils/errorManager");

const dummyBuckets = [
  {
    _id: "_2a23nnva892320dm19i8xnc9", // mongoose default
    bucketShortId: "a5Ty7j", // unique
    bucketName: "", // can be empty
    validity: "", // defa
    authorDetails: {
      userId: "ljanv724onvlls__ajogn_13r5", // this is must for every bucket
      name: "",
      ip_address: "",
      device: "",
    },
    textList: [
      {
        textShortId: "kLayp5j", // must be unique through this array
        text: "https://yt.be", // can't contain any html or injection code that hampers UI
        title: "", // can be empty,
        createdAt: "12/02/26 11:45 GMT+6",
        updatedAt: "08/03/26 10:11 GMT+6", // update each time
      },
    ],
  },
];

// this must provide buckets with that specific user id which is encoded in cookies.
exports.getAllBuckets = (req, res) => {
  return res.status(200).json({
    data: dummyBuckets,
  });
};

exports.createNewBucket = async (req, res, next) => {
  try {
    const newText = await createNewText(req);
    const newBucket = await Bucket.create({
      textList: [newText],
    });
    return res.status(201).json({
      data: newBucket,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBucketById = async (req, res, next) => {
  try {
    const bucketId = req.params.bucketId;

    const dbBucket = await getBucketById(bucketId);
    return res.status(200).json({
      data: dbBucket,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBucket = async (req, res, next) => {
  try {
    const bucketId = req.params.bucketId;
    const result = await Bucket.updateOne(
      {
        bucketShortId: bucketId,
        expiresAfter: { $ne: 0 },
      },
      {
        $set: {
          expiresAfter: 0,
        },
      }
    );
    if (result.matchedCount === 0)
      createError(404, "Bucket with given shortId doesn't exist.");

    return res.status(200).json({
      message: `Bucket ${bucketId} deleted succesfully.`,
    });
  } catch (err) {
    next(err);
  }
};
