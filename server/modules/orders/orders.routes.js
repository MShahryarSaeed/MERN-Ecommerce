const express=require("express");
const verifyUser = require("../../middlewares/verifyUser");
const { createOrder } = require("./controllers/createOrder");
const GetAllOrders = require("./controllers/GetAllOrders");
const GetSingleOrder = require("./controllers/GetSingleOrder");
const updateOrder = require("./controllers/updateOrder");
const { getSalesSum, getOrderStats } = require("./controllers/OrderCtrls");

const orderRoutes=express.Router();

// OrderCtrl
orderRoutes.get('/stats',verifyUser,getOrderStats)

// Routes
orderRoutes.get('/GetSingleOrder/:orderId',verifyUser,GetSingleOrder);
orderRoutes.get('/GetAllOrders',verifyUser,GetAllOrders);
orderRoutes.post('/createOrder',verifyUser,createOrder);
orderRoutes.put('/updateOrder/:orderId',verifyUser,updateOrder);


module.exports=orderRoutes;