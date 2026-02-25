const express = require("express");
const { addNewText, updateText } = require("../controllers/textListController");
const {
  requireBodyParams,
} = require("../middlewares/requireBodyParamsMiddleware");
const router = express.Router({ mergeParams: true });

router.post("/", requireBodyParams(["text"]), addNewText);
router.patch("/:textId", requireBodyParams(["text"]), updateText);

module.exports = router;
