const express=require("express");
const verifyUser = require("../../middlewares/verifyUser");
const UpdateShippingAddress = require("./controllers/UpdateShippingAddress");
const userProfile = require("./controllers/userProfile");
const upload=require("../../middlewares/CategoryFileUpload");
const updateUserProfile = require("./controllers/updateUserProfile");
const DeleteUser = require("./controllers/DeleteUser");

const userRoutes=express.Router();

userRoutes.get('/userProfile/:userId',verifyUser,userProfile);
userRoutes.put("/updateProfile/:userId",verifyUser,upload.single('profilePicture'),updateUserProfile);
userRoutes.delete("/deleteuser/:userid",verifyUser,DeleteUser);
userRoutes.put('/update/shipping/:userId',verifyUser,UpdateShippingAddress);

module.exports=userRoutes;