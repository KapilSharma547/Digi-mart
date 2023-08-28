const express = require("express");
const { createProduct } = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// router export
const router = express.Router();

isAdmin
router.post("/create", authMiddleware,isAdmin, createProduct);

module.exports = router;
