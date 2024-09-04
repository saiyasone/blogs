const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const db = require("./configs/db.config");

require("dotenv").config();

const mainRoutes = require("./routes/index.route");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/api/v1", mainRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const main = async () => {
  server.listen(PORT, () => {
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
