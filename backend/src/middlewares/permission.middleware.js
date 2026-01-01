const permit = (...requiredPermissions) => {
  return (req, res, next) => {
    if (req.user.roles.includes("Admin")) return next();

    const allowed = requiredPermissions.some(p =>
      req.user.permissions.includes(p)
    );

    if (!allowed) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};

module.exports = { permit };
