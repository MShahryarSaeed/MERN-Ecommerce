const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            ref: "categories",
            required: true,
        },
        sizes: {
            type: [String],
            enum: ["S", "M", "L", "XL", "XXL"],
            required: true,
        },
        colors: {
            type: [String],
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },

        images: [
            //stores the path or urls of the images
            {
                type: String,
                required: true,
            },
        ],

        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "reviews",
            },
        ],

        price: {
            type: Number,
            required: true,
        },

        totalQty: {
            type: Number,
            required: true,
        },
        totalSold: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);
// virtuals

// total Quantity Left
productsSchema.virtual("totalQuantityLeft").get(function(){
    const product=this;
    return product?.totalQty - product?.totalSold;
});

// total Reviews
productsSchema.virtual("totalReviews").get(function(){
    //get the product
    const product=this;

    return product?product.reviews.length : null;

})

// Average Rating
productsSchema.virtual("AverageRating").get(function(){

    //get the product
    const product=this;

    let ratingsTotal=0;
    
    product?.reviews?.forEach((review)=>{
        ratingsTotal+=review?.rating
    })
    // calculate average by dividing sum of all reviews rating numbers with total reviews
    const averageRating=Number(ratingsTotal/product?.reviews?.length).toFixed(1);

    return averageRating;
    
})

const productModel = mongoose.model("products", productsSchema);

module.exports = productModel;