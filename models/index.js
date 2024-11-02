const db = require("../util/database");
const { Role, User, UserRole } = require("./user");

const initializeDB = async (forceSyncDB = false) => {
  User.belongsToMany(Role, {
    through: UserRole,
  });
  Role.belongsToMany(User, {
    through: UserRole,
  });

  await db.sync({
    force: forceSyncDB,
  });

  if (forceSyncDB) {
    await createRoles();
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

module.exports = {
  initializeDB,
  User,
  Role,
  UserRole,
};
