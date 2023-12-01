const Product = require("../models/productModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    if (title) {
      req.body.slug = slugify(title);
    }
    const newProduct = await new Product(req.body);
    return res.status(200).json({ success: true, newProduct });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

module.exports = { createProduct };
