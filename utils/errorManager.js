exports.createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error; // Immediately breaks execution and moves to the catch block
};
