const express=require("express");
const {createColor,GetAllColors,GetSingleColor,UpdateColor,DeleteColor}=require("./controllers/colorCtrl");
const verifyUser = require("../../middlewares/verifyUser");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");


const colorRoutes=express.Router();

colorRoutes.get("/GetAllColors",GetAllColors);
colorRoutes.post('/createColor',verifyUser,isAdminMiddleware,createColor);
colorRoutes.get('/GetSingleColor/:colorId',GetSingleColor);
colorRoutes.put('/UpdateColor/:colorId',verifyUser,isAdminMiddleware,UpdateColor);
colorRoutes.delete('/DeleteColor/:colorId',verifyUser,isAdminMiddleware,DeleteColor);


module.exports=colorRoutes