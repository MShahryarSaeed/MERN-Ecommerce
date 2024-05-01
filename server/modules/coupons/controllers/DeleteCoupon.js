const mongoose=require("mongoose");

const DeleteCoupon=async(req,res)=>{

    const couponModel=mongoose.model("coupons");
    const{couponId}=req.params;

    const coupon=await couponModel.findByIdAndDelete(couponId);
    if(!coupon) throw "Coupon Not Found";

    res.status(200).json({
        status:"Success",
        message:"Coupon Deleted Successfully",
        coupon:coupon
    })


}

module.exports=DeleteCoupon