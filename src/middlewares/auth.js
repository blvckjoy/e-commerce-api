const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

   if (!token) return res.status(401).json({ message: "Access Denied" });

   try {
      const verified = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = verified;

      next();
   } catch (error) {
      res.status(403).json({ message: "Invalid Token" });
   }
};

module.exports = authMiddleware;
