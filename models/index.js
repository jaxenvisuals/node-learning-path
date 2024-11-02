const db = require("../util/database");
const { Role, User, UserRole, Session, createUser } = require("./user");

const initializeDB = async (forceSyncDB = false) => {
  User.belongsToMany(Role, {
    through: UserRole,
  });
  Role.belongsToMany(User, {
    through: UserRole,
  });
  User.hasMany(Session);
  Session.belongsTo(User);

  await db.sync({
    force: forceSyncDB,
  });

  if (forceSyncDB) {
    await createRoles();
    await createAdmin();
    await assignAdminRole();
  }

  console.warn("Database is synchronized");

  return true;
};

const createRoles = async () => {
  await Role.create({
    name: "admin",
    productCreate: true,
    productRead: true,
    orderRead: true,
    orderCreate: false,
    cartRead: false,
    cartCreate: false,
  });

  await Role.create({
    name: "buyer",
    productCreate: false,
    productRead: true,
    orderRead: true,
    orderCreate: true,
    cartRead: true,
    cartCreate: true,
  });
};

const createAdmin = async () => {
  await createUser("admin", "admin", "admin");
};

const assignAdminRole = async () => {
  const admin = await User.findOne({
    where: {
      username: "admin",
    },
  });

  const adminRole = await Role.findOne({
    where: {
      name: "admin",
    },
  });

  await admin.addRole(adminRole);
};

module.exports = {
  initializeDB,
  User,
  Role,
  UserRole,
};
