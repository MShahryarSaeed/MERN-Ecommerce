const mongoose=require("mongoose");

const UpdateProduct=async(req,res)=>{

    const{productId}=req.params;
    const productModel=mongoose.model("products");
    if(!req.user.isAdmin) throw "You are Not Allowed to Create Product";

    const { name, description, category, sizes, colors , price, totalQty, brand }= req.body;

    const product=await productModel.findByIdAndUpdate(
        {_id:productId},
        {
            $set:{
                name:name,
                description:description,
                category:category,
                sizes:sizes,
                colors:colors,
                price:price,
                totalQty:totalQty,
                brand:brand
            }
        },
        {
            new:true
        }
    );

    res.status(200).json({
        status:"Success",
        message:"Product Updated Successfully",
        Updatedproduct:product
    })
}

module.exports=UpdateProduct;
