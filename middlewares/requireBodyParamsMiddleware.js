exports.requireBodyParams = (requiredParams) => {
  return function (req, res, next) {
    const missing = [];
    const values = {};

    for (const param of requiredParams) {
      const value = req.body?.[param]?.trim();

      if (value === undefined || value === null || value === "") {
        missing.push(param);
      } else {
        values[param] = value;
      }
    }

    if (missing.length)
      return res.status(400).json({ missingBodyParams: missing });

    req.requiredBodyParams = values;

    console.log(req.requiredBodyParams);

    next();
  };
};
