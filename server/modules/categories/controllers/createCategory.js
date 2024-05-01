const mongoose=require("mongoose");

const createCategory=async(req,res)=>{

    const categoryModel=mongoose.model("categories");
    if(!req.user.isAdmin) throw "You are Not Allowed to Create Category";
    const{name}=req.body;

    const categortExits=await categoryModel.findOne({name:name});
    if(categortExits) throw "Category Already Exists";

    const category=await categoryModel.create({
        name:name.toLowerCase(),
        user:req.user._id,
        image:req.file.path
    });
    
    res.status(201).json({
        status:"Success",
        message:"Category Created Successfully",
        category:category
    });

}

module.exports=createCategory;