require('dotenv').config()
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    console.log("Header:", header);
  
    const token = header && header.split(" ")[1];
    console.log("Token:", token);
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
  
    try {
      const decoded = jwt.verify(token,process.env.SECRECT_KEY);
  
      console.log("Decoded:", decoded);
  
      req.user = decoded;
      next();
    }catch (error) {
        console.log("JWT ERROR:", error.message);
      
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
  };

module.exports = authMiddleware;