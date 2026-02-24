const express = require("express");
const { addNewText, updateText } = require("../controllers/textListController");
const router = express.Router({ mergeParams: true });

router.post("/", addNewText);
router.patch("/:textId", updateText);

module.exports = router;
