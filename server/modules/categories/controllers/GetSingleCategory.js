const mongoose=require("mongoose");

const GetSingleCategory=async(req,res)=>{

    const{categoryId}=req.params;
    const categoryModel=mongoose.model("categories");

    const category=await categoryModel.findById(categoryId);
    if(!category) throw "Category Not Found";
    
    res.status(200).json({
        status:"Success",
        message:"Category Fetched Successfully",
        category:category
    });
}

module.exports=GetSingleCategory