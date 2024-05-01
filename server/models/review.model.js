const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "Review must belong to a user"],
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: [true, "Review must belong to a product"],
        },
        message: {
            type: String,
            required: [true, "Please add a message"],
        },
        rating: {
            type: Number,
            required: [true, "Please add a rating between 1 and 5"],
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

const reviewModel = mongoose.model("reviews", ReviewSchema);

module.exports = reviewModel;