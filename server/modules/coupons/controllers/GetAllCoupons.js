const mongoose=require("mongoose");

const GetAllCoupons=async(req,res)=>{

    const couponModel=mongoose.model("coupons");

    const coupons=await couponModel.find({});

    if(!coupons) throw "Coupons Not Found";

    res.status(200).json({
        status:"Success",
        message:"Coupons Listed Successfully",
        coupons:coupons
    });

}

module.exports=GetAllCoupons;