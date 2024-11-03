const {
  retrieveSession,
  retrieveUser,
  retrieveUserRoles,
} = require("../database/auth");

const checkAuth = (throwError) => {
  return async (req, res, next) => {
    try {
      const session = req.cookies.sessionId;

      if (!session) throw new Error("No session found");

      const { userId } = await retrieveSession(session);

      const user = await retrieveUser(userId);

      const roles = await retrieveUserRoles(userId);

      req.user = user;
      req.authenticated = true;
      req.roles = roles;

      return next();
    } catch (error) {
      console.error(error);

      if (throwError) {
        return res.status(401).render("login", {
          title: "Login",
          errorMessage: "Please login to access this page",
          successMessage: "",
        });
      }

      next();
    }
  };
};

module.exports = {
  checkAuth,
};
