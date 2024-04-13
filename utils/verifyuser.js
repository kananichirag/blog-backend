const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return res.json({ success: false, msg: "Unauthorized.!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.json({ success: false, msg: "Invalid token.!" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
};
