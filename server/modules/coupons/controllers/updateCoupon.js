const mongoose = require("mongoose");

const updateCoupon = async (req, res) => {

    if (!req.user.isAdmin) throw "You are Not Allowed to Update Coupon,Only Admins Can Update Coupon!";

    const couponModel = mongoose.model("coupons");
    const { couponId } = req.params;
    const{code}=req.body;

    const coupon = await couponModel.findByIdAndUpdate(couponId,
        {
            $set: {
                code: code.toUpperCase(),
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                discount: req.body.discount
            }
        },
        {
            new: true
        }
    );

    if (!coupon) throw "Coupon Not Found";

    res.status(200).json({
        status: "Success",
        message: "Coupon Updated Successfully",
        coupon: coupon
    });


}

module.exports = updateCoupon