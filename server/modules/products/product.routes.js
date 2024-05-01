const express=require("express");
const verifyUser=require("../../middlewares/verifyUser");
const createProduct = require("./controllers/createProduct");
const GetAllProducts = require("./controllers/GetAllProducts");
const GetSingleProduct = require("./controllers/GetSingleProduct");
const UpdateProduct = require("./controllers/UpdateProduct");
const DeleteProduct = require("./controllers/DeleteProduct");
const upload = require("../../middlewares/fileUpload");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const productRoutes=express.Router();

// Routes
productRoutes.get('/GetAllProducts',GetAllProducts);
productRoutes.post('/createProduct',verifyUser,isAdminMiddleware,upload.array("files"),createProduct);
productRoutes.get('/GetSingleProduct/:productId',GetSingleProduct);
productRoutes.put('/UpdateProduct/:productId',verifyUser,isAdminMiddleware,UpdateProduct);
productRoutes.delete('/DeleteProduct/:productId',verifyUser,isAdminMiddleware,DeleteProduct);

module.exports=productRoutes