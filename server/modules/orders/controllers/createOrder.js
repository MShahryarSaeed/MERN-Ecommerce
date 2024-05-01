const mongoose = require("mongoose");
// const userModel = require("../../../models/user.model"); 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Before creating order run this commands in cmd
// stripe listen --forward-to localhost:3000/webhook

const createOrder = async (req, res) => {

    // GET coupon from query String
    const { coupon } = req?.query;

    const couponModel = mongoose.model("coupons");
    const couponFound = await couponModel.findOne({ code: coupon });
    if (!couponFound) throw "Coupon Does Not Exists!";

    if(couponFound?.isExpired) throw "Coupon Expired!";

    // GET Discount
    const discount = couponFound?.discount/100;

    const userModel = mongoose.model("users");//will store orderId in user model
    const orderModel = mongoose.model("orders"); //save order in order Model
    const productModel = mongoose.model("products");//update product quantity and totalSold

    // Step 1: Find the User who is placing the order
    const user = await userModel.findById(req.user._id);
    if (!user) throw "User Not Found";

    // Step 2: Check if the user has provided a shipping address
    if (!user?.hasShippingAddress) throw "Please Add Shipping Address";

    // Step 3: Get the payload (orderItems, shippingAddress, totalPrice)
    const { orderItems, shippingAddress, totalPrice } = req.body;

    // Step 4: Check if the order is not empty
    if (!orderItems || orderItems.length <= 0) throw "Cart is Empty";
    if (!shippingAddress) throw "Shipping Address is Required";

    // Step 5: Place/create order and save it
    const order = await orderModel.create({
        user: req.user._id,
        orderItems: orderItems,
        shippingAddress: shippingAddress,
        totalPrice: couponFound ? totalPrice - (totalPrice * discount) : totalPrice,
    });

    console.log(order);

    // Step 6: Update the product quantity and totalSold
    const products = await productModel.find({ _id: { $in: orderItems } });

    orderItems?.map(async (order) => {  //orderItems is an array of objects and we map through it to find the product and update the quantity and totalSold
        const product = products?.find((product) => {
            return product?._id.toString() === order?._id.toString()
        });

        if (product) {
            product.totalSold += order.totalQtyBuying;
            await product.save();
        }
    });

    // Step 7: Push order into user's orders array and save the user
    user.orders.push(order._id);
    await user.save();

    //Step 8: Make Payment using Stripe
    //convert orderItems to have same structure that stripe needed

    const convertedOrders = orderItems.map((order) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: order?.name,
                    description: order?.description,
                },
                unit_amount: order.price * 100,
            },
            quantity: order.totalQtyBuying
        }
    });

    const session = await stripe.checkout.sessions.create({

        line_items: convertedOrders,
        metadata: {
            orderId: JSON.stringify(order?._id),
        },
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    res.send({ url: session.url });
    //Step 9:Payment webhook
    //Step 10: Update the user Order

    // Step 11: Respond with success message and order details
    // res.status(200).json({
    //     success: true,
    //     message: "Order Placed Successfully",
    //     order: order,
    //     user: user
    // });
}

module.exports = { createOrder }
