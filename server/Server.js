const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
// app
const app = express();

// connect Db
dbConnect();

// middleware
app.use(express.json());


// Route Imports
const authRoute = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
// Route
app.use("/api/user", authRoute);
app.use("/api/product", productRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at Port http://localhost:${PORT}`);
});
