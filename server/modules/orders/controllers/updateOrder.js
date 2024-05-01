const mongoose=require("mongoose");

const updateOrder=async(req,res)=>{

    const {orderId}=req.params;
    const orderModel=mongoose.model("orders");

    if(!req.user.isAdmin) throw "You are Not Allowed to Update Orders Status";

    const updateOrder=await orderModel.findByIdAndUpdate(
        orderId,
        {
            $set:{
                status:req.body.status
            }
        },
        {
            new :true
        }
    );

    res.status(200).json({
        status:"Success",
        message:"Order Status Updated Successfully",
        updatedOrder:updateOrder
    });

}

module.exports=updateOrder;