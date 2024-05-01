const mongoose = require("mongoose");

const GetAllProducts = async (req, res) => {

  const productModel = mongoose.model("products");

  const priceRange = req.query.price?.split("-");
  
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const filters = {
    ...(req.query.name && { name: { $regex: req.query.name, $options: "i" } }),
    ...(req.query.colors && { colors: { $regex: req.query.colors, $options: "i" } }),
    ...(req.query.brand && { brand: { $regex: req.query.brand, $options: "i" } }),
    ...(req.query.sizes && { sizes: { $regex: req.query.sizes, $options: "i" } }),
    ...(req.query.category && { category: { $regex: req.query.category, $options: "i" } }),
    ...(req.query.price && { price: { $gte: priceRange[0], $lte: priceRange[1] } }),
  };

  const totalProducts = await productModel.countDocuments();


  const pagination = {};
  if (endIndex < totalProducts) {
    pagination.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit
    }
  }

  const products = await productModel.find(filters).skip(startIndex).limit(limit).populate("reviews");


  res.status(200).json({
    status: "Success",
    message: "All Products",
    products: products,
    totalProducts: totalProducts,
    results: products.length,
    pagination: pagination
  });
  
}

module.exports = GetAllProducts;