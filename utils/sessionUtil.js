const { v4: uuidv4 } = require("uuid");

exports.generateSessionId = () => uuidv4();
