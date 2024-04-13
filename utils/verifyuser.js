const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  }
  const token = getCookie("access_token");
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
