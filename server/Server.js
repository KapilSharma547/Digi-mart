const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
// app
const app = express();

// connect Db
dbConnect();

// Route
app.use("/api/user", () => {});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at Port http://localhost:${PORT}`);
});
