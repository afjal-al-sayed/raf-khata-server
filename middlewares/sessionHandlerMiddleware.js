const { SESSION_DURATION, SESSION_COOKIE_NAME } = require("../config/env.js");
const { generateSessionId } = require("../utils/sessionUtil.js");

exports.sessionHandlerMiddleware = (req, res, next) => {
  let sessionId = req.cookies[SESSION_COOKIE_NAME];

  if (!sessionId) {
    sessionId = generateSessionId();

    res.cookie(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: SESSION_DURATION * 1000,
      secure: false, // this should be true in https (production mode);
    });
  }

  req.sessionId = sessionId;
  next();
};
