const mongoose=require("mongoose");

const createCoupon=async(req,res)=>{

    const{code,startDate,endDate,discount}=req.body;

    if(!req.user.isAdmin) throw "You are Not Allowed to Create Coupon,Only Admins Can Create Coupon!";

    const couponModel=mongoose.model("coupons");

    const couponExists=await couponModel.findOne({code:code});
    if(couponExists) throw "Coupon Already Exists";

    if(isNaN(discount)) throw "Discount Must Be A Number";

    const coupon=await couponModel.create({
        code:code.toUpperCase(),
        startDate:startDate,
        endDate:endDate,
        discount:discount,
        user:req.user._id
    });

    res.status(201).json({
        status:"Success",
        message:"Coupon Created Successfully",
        coupon:coupon
    });


}

module.exports=createCoupon;