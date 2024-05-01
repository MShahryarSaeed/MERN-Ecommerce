const mongoose=require("mongoose");

const GetSingleProduct=async(req,res)=>{

    const{productId}=req.params;
    const productModel=mongoose.model("products");

    const product=await productModel.findById(productId).populate("reviews");

     if(!product){
        throw "Product Not Found";
    }

    res.status(200).json({
        status:"Success",
        message:"Product Fetched Successfully",
        product:product
    })

}

module.exports=GetSingleProduct;