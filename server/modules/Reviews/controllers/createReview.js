const mongoose=require("mongoose");

const createReview=async(req,res)=>{

    const reviewModel=mongoose.model("reviews");
    const productModel=mongoose.model("products");

    const product=await productModel.findById(req.params.productId);
    if(!product) throw "Product Not Found";

    // check if userAlready Reviewed
    const userAlreadyReviewed=await reviewModel.findOne({user:req.user._id , product:req.params.productId});
    if(userAlreadyReviewed) throw "You Already Reviewed This Product";

    const review=await reviewModel.create({
        user:req.user._id,
        product:req.params.productId,
        message:req.body.message,
        rating:req.body.rating
    });
    
    product.reviews.push(review?._id);
    await product.save();

    res.status(201).json({
        status:"Success",
        message:"Review Created Successfully",
        review:review
    });

}

module.exports=createReview;