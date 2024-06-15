const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: [true, "Users Fullname is Required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Users Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Users Password is Required"],
    },
    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    orders: [
        //orders is an array of orders which store the Mongoose Id's of each order  created by this user and we can see this order using populate method
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders" //orders is the name of  the order model
        }
    ],
    whisLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "whisLists"
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasShippingAddress: {
        type: Boolean,
        default: false
    },
    shippingAddress: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        postalCode: {
            type: String
        },
        province: {
            type: String
        },
        country: {
            type: String
        },
        phone: {
            type: String
        }
    }

}, {
    timestamps: true
});

const userModel = mongoose.model("users", usersSchema);

module.exports = userModel;