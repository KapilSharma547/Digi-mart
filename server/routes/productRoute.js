const express = require("express");
const { createProduct } = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// router export
const router = express.Router();

router.post("/", authMiddleware, isAdmin, (req, res) => {
  res.send("OK");
});

module.exports = router;
