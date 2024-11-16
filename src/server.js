const express = require("express");
const http = require("http");
const cors = require("cors");
const https = require("https");
const path = require("path");
const fs = require("fs");

const app = express();
const db = require("./configs/db.config");

const passport = require("passport");
const cookieSession = require("cookie-session");

require("./providers/googleAuth.provider");
require("dotenv").config();

const mainRoutes = require("./routes/index.route");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cookieSession({
    name: "google-session",
    keys: [`${process.env.SECRET_SESSION_KEY}`],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", mainRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const sslServer = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, "../cert/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "../cert/cert.pem")),
});

const main = async () => {
  sslServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    await db.$disconnect();
    console.log("Server.js error: " + error);
    process.exit(0);
  });
