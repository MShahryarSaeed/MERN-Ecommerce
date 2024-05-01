const express=require("express");
const verifyUser = require("../../middlewares/verifyUser");
const createReview = require("./controllers/createReview");

const reviewRoutes=express.Router();

// Routes
reviewRoutes.post('/createReview/:productId',verifyUser,createReview);

module.exports=reviewRoutes;