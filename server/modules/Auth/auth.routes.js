const express=require("express");
const SignUp = require("./controllers/SignUp");
const SignIn = require("./controllers/SignIn");
const SignOut = require("./controllers/SignOut");

const authRoutes=express.Router();


authRoutes.post('/signup',SignUp);
authRoutes.post('/signin',SignIn);
authRoutes.post('/signout',SignOut);

module.exports=authRoutes;