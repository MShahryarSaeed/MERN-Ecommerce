const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
        ],
    },
    {
        timestamps: true
    }
);

const BrandModel = mongoose.model("brands", BrandSchema);

module.exports=BrandModel;