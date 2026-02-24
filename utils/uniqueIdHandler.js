const { customAlphabet } = require("nanoid");

const usableAlphabets =
  "23456789ABCEFGHJKLMNPQRSTUVWXYZabcdefghijknpqrstuvwxyz"; // remover 0, O, o, I, l, 1 for avoiding collison

exports.generateNewShortId = customAlphabet(usableAlphabets, 6);
