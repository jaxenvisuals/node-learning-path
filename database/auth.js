const UserModel = require("../models/user");

const retrieveSession = async (id) => {
  const session = await UserModel.Session.findOne({
    where: {
      id,
    },
  });

  if (!session) throw new Error("Session not found");

  return session;
};

const retrieveUser = async (id) => {
  const user = await UserModel.User.findOne({
    where: {
      id,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

const retrieveUserRoles = async (userId) => {
  const { roleId } = await UserModel.UserRole.findOne({
    where: {
      userId,
    },
  });

  if (!roleId) throw new Error("User's role not found");

  const roles = await UserModel.Role.findOne({
    where: {
      id: roleId,
    },
  });

  return roles;
};

module.exports = {
  retrieveSession,
  retrieveUser,
  retrieveUserRoles,
};
