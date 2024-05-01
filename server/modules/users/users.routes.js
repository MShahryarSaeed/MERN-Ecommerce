const express=require("express");
const verifyUser = require("../../middlewares/verifyUser");
const UpdateShippingAddress = require("./controllers/UpdateShippingAddress");
const userProfile = require("./controllers/userProfile");

const userRoutes=express.Router();

userRoutes.get('/userProfile/:userId',verifyUser,userProfile);
userRoutes.put('/update/shipping/:userId',verifyUser,UpdateShippingAddress);

module.exports=userRoutes;