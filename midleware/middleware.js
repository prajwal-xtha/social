require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  console.log("Header:", header);

  if (!header) {
    return res.status(401).json({
      success: false,
      message: "No Authorization header",
    });
  }

  const token = header.split(" ")[1];

  console.log("Token:", token);
  console.log("Secret:", process.env.SECRECT_KEY);

  try {
    const decoded = jwt.verify(token, process.env.SECRECT_KEY);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authMiddleware;