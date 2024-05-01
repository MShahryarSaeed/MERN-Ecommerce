const mongoose = require("mongoose");

const UpdateShippingAddress = async (req, res) => {

    const userModel = mongoose.model("users");
    const { userId } = req.params;

    if (req.user._id !== userId) throw "You are Not Allowed to Update Shipping Address!";

    const { firstName, lastName, address, city, postalCode, province, country, phone } = req.body;

    const user = await userModel.findByIdAndUpdate(req.user._id, {
        shippingAddress: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            postalCode: postalCode,
            province: province,
            country: country,
            phone: phone

        },
        hasShippingAddress: true
    },
        {
            new: true
        }
)


res.status(200).json({
    status: "Success",
    message: "Shipping Address Updated Successfully",
    user:user
})

}

module.exports = UpdateShippingAddress;