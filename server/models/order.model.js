const mongoose = require("mongoose");

// Generate random Numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleLowerCase();
const randomNumbers = Math.floor(1000 + Math.random() * 9000)

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        orderItems: [
            {
                type: Object,
                required: true
            }
        ],
        shippingAddress: {
            type: Object,
            required: true
        },
        orderNumber: {
            type: String,
            required: true,
            default: randomTxt + randomNumbers
        },
        paymentStatus: {
            type: String,
            default: "Not paid"
        },
        paymentMethod: {
            type: String,
            default: "Not specified"
        },
        totalPrice:{
            type:Number,
            default:0.0
        },
        currency: {
            type: String,
            default: "Not specified"
        },
        //   For Admin
        status: {
            type: String,
            default: "pending",
            enum:["pending","processing","shipped","delivered"]
        },
        deliveredAt: {
            type:Date
        }
    },
    {
        timestamps: true
    }
);

const orderModel = mongoose.model("orders", OrderSchema);

module.exports = orderModel;