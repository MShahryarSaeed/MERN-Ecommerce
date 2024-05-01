const mongoose=require("mongoose");

const DeleteProduct=async(req,res)=>{

    const {productId}=req.params;
    const productModel=mongoose.model("products");
    if(!req.user.isAdmin) throw "You are Not Allowed to Delete Product";

    const product=await productModel.findByIdAndDelete({_id:productId});
    if(!product) throw "Product Not Found";

    res.status(200).json({
        status:"Success",
        message:`${product.name} is Deleted Successfully`,
        DeletedProduct:product
    });

}

module.exports=DeleteProduct;