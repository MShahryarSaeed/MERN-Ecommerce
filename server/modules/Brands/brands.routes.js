const express=require("express");
const{createBrand,GetAllBrands,GetSingleBrand,UpdateBrand,DeleteBrand}=require("./controllers/brandCtrl");
const verifyUser = require("../../middlewares/verifyUser");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const brandRoutes=express.Router();

brandRoutes.get('/GetAllBrands',GetAllBrands);
brandRoutes.post('/createBrand',verifyUser,isAdminMiddleware,createBrand);
brandRoutes.get('/GetSingleBrand/:brandId',GetSingleBrand);
brandRoutes.put('/updateBrand/:brandId',verifyUser,isAdminMiddleware,UpdateBrand);
brandRoutes.delete('/DeleteBrand/:brandId',verifyUser,isAdminMiddleware,DeleteBrand);


module.exports=brandRoutes;