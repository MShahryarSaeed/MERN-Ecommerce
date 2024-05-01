const express=require("express");
const verifyUser = require("../../middlewares/verifyUser");
const createCoupon = require("./controllers/createCoupon");
const GetAllCoupons = require("./controllers/GetAllCoupons");
const GetSingleCoupon = require("./controllers/GetSingleCoupon");
const updateCoupon = require("./controllers/updateCoupon");
const DeleteCoupon = require("./controllers/DeleteCoupon");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const couponRoutes=express.Router();

// Routes
couponRoutes.get("/GetAllCoupons",GetAllCoupons);
couponRoutes.get("/GetSingleCoupon/:couponId",GetSingleCoupon);
couponRoutes.post('/createCoupon',verifyUser,isAdminMiddleware,createCoupon);
couponRoutes.put("/updateCoupon/:couponId",verifyUser,isAdminMiddleware,updateCoupon);
couponRoutes.delete("/deleteCoupon/:couponId",verifyUser,isAdminMiddleware,DeleteCoupon);

module.exports=couponRoutes