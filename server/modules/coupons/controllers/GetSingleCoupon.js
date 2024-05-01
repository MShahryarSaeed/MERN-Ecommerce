const mongoose=require("mongoose");

const GetSingleCoupon=async(req,res)=>{

    const couponModel=mongoose.model("coupons");
    const{couponId}=req.params;

    const coupon=await couponModel.findById(couponId);
    if(!coupon) throw "Coupon Not Found";

    res.status(200).json({
        status:"Success",
        message:"Coupon Fetched Successfully",
        coupon:coupon
    })
}

module.exports=GetSingleCoupon