const express=require("express");
const verifyUser = require("../../middlewares/verifyUser");
const createCategory = require("./controllers/createCategory");
const GetAllCategories = require("./controllers/GetAllCategories");
const GetSingleCategory = require("./controllers/GetSingleCategory");
const UpdateCategory = require("./controllers/UpdateCategory");
const DeleteCategory = require("./controllers/DeleteCategory");
const CategoryFileUpload = require("../../middlewares/CategoryFileUpload");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const categoryRoutes=express.Router();

// Routes
categoryRoutes.get('/GetAllCategories',GetAllCategories);
categoryRoutes.post('/createCategory',verifyUser,isAdminMiddleware,CategoryFileUpload.single("file"),createCategory);
categoryRoutes.get('/GetSingleCategory/:categoryId',GetSingleCategory);
categoryRoutes.put('/UpdateCategory/:categoryId',verifyUser,isAdminMiddleware,UpdateCategory);
categoryRoutes.delete('/DeleteCategory/:categoryId',verifyUser,isAdminMiddleware,DeleteCategory);

module.exports=categoryRoutes;