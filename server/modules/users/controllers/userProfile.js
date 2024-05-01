const mongoose=require("mongoose");

const userProfile=async(req,res)=>{

    const userModel=mongoose.model("users");
    const {userId}=req.params;

    if(req.user._id !== userId) throw "You are Not Allowed to View this User Profile!"

    const user=await userModel.findById(req.user._id).populate("orders");

    res.status(200).json({
        status:"Success",
        message:"User Profile",
        user:user
    })

}

module.exports=userProfile