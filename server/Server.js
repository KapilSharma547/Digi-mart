const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const cors = require("cors");
// Route Imports
const authRoute = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const notFound = require("./middlewares/notFoundErro");
const errorMiddleware = require("./middlewares/errorHandler");
// app
const app = express();

// connect Db
dbConnect();

// const corsOptions = {
//     origin: "https://digi-mart-client-application.onrender.com" // frontend URI (ReactJS)
// }

// middleware
app.use(express.json());
app.use(cors());
// app.use(cors(corsOptions));

// Route
// app.use("/", (req, res) => {
//   res.json("Application is working");
// });

app.use("/api/user", authRoute);
app.use("/api/product", productRouter);

app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at Port http://localhost:${PORT}`);
});
