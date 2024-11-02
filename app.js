const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startApp = (forceSyncDBAnswer) => {
  let forceSyncDB = false;

  if (forceSyncDBAnswer === "YES") {
    console.warn("DB WILL BE FORCEFULLY SYNCED");
    forceSyncDB = true;
  }

  const { initializeDB } = require("./models");

  // initialize database and then open ports
  initializeDB(forceSyncDB)
    .then(() => {
      const cookieParser = require("cookie-parser");
      const express = require("express");
      const bodyParser = require("body-parser");

      const router = require("./controllers/router");

      const app = express();

      // set cookie parser
      app.use(cookieParser());

      // set view engine
      app.set("view engine", "ejs");
      app.set("views", "views");

      app.use(
        bodyParser.urlencoded({
          extended: false,
        })
      );

      // configure routers
      app.use(router);

      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// rl.question("Force Sync DB? (YES/no(n)): ", startApp);

startApp("NO");
