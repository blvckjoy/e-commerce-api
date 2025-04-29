function authRole(role) {
   return (req, res, next) => {
      // Check if user exists in request
      if (!req.user) {
         return res.status(401).json({ message: "Authentication required" });
      }

      // Check if user has the required role
      if (req.user.role !== role) {
         return res.status(403).json({
            message: "Access denied. Insufficient permissions.",
            requiredRole: role,
            currentRole: req.user.role,
         });
      }

      next();
   };
}

module.exports = { authRole };
