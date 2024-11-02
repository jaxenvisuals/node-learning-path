const { Sequelize } = require("sequelize");
const UserModel = require("../models/user");

const index = (req, res) => {
  const session = req.cookies.sessionId;

  console.log("Home", session);

  return res.render("index", {
    title: "Home",
  });
};

const login = (req, res) => {
  return res.render("login", {
    title: "Login",
    successMessage: "",
    errorMessage: "",
  });
};

const signup = (req, res) => {
  return res.render("signup", {
    title: "Signup",
    errorMessage: "",
  });
};

const createSignup = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    await UserModel.createUser(username, name, password);

    return res.render("login", {
      title: "Login",
      successMessage: "You have been bUggEReD!",
      errorMessage: "",
    });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      const code = error.parent.code;
      if (code === "ER_DUP_ENTRY") {
        return res.status(400).render("signup", {
          title: "Signup",
          errorMessage: "Username already exists",
          successMessage: "",
        });
      }
    }

    console.error(error);

    return res.status(400).render("signup", {
      title: "Signup",
      errorMessage: "An error occurred",
      successMessage: "",
    });
  }
};

const createLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.User.findOne({
      where: {
        username,
        password,
      },
    });

    if (!user) throw new Error();

    const session = await user.createSession();

    res.cookie("sessionId", session.id);

    return res.redirect("/");
  } catch (error) {
    console.error(error);

    return res.status(400).render("login", {
      title: "Login",
      errorMessage: "Only Bugs allowed 🐙",
      successMessage: "",
    });
  }
};

module.exports = {
  index,
  login,
  signup,
  createSignup,
  createLogin,
};
