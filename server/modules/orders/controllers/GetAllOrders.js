const mongoose=require("mongoose");

const GetAllOrders=async(req,res)=>{

    if(!req.user.isAdmin) throw "You are Not Allowed to View All Orders";

    const orderModel=mongoose.model("orders");

    const orders=await orderModel.find({});

    res.status(200).json({
        status:"Success",
        message:"Orders Listed Successfully",
        orders:orders
    })

}

module.exports=GetAllOrders;