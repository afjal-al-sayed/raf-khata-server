const { customAlphabet } = require("nanoid");

const usableAlphabets =
  "23456789ABCEFGHJKLMNPQRSTUVWXYZabcdefghijknpqrstuvwxyz"; // remover 0, O, o, I, l, 1 for avoiding collison

exports.generateNewShortId = (reservedIds = []) => {
  console.log(reservedIds);
  let newShortId = customAlphabet(usableAlphabets, 6)();
  while (true) {
    if (!reservedIds.includes(newShortId)) {
      reservedIds.push(newShortId);
      return newShortId;
    }
    newShortId = customAlphabet(usableAlphabets, 6)();
  }
};
