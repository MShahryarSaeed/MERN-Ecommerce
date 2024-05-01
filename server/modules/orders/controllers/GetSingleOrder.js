const mongoose=require("mongoose");
const orderModel = require("../../../models/order.model");

const GetSingleOrder=async(req,res)=>{

    const{orderId}=req.params;
    
    const order=await orderModel.findById(orderId);

    res.status(200).json({
        status:"Success",
        message:"Order Fetched Successfully",
        order:order
    })

}

module.exports=GetSingleOrder