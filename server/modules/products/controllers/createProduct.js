const mongoose=require("mongoose");

const createProduct=async(req,res)=>{

    // console.log(req.files); //for single file upload
    // console.log(req.body);

    const convertedImages=req.files.map((file)=>file.path);

    const productModel=mongoose.model("products");
    // Check if the user is admin
    if(!req.user.isAdmin) throw "You are Not Allowed to Create Product";

    const { name, description, category, sizes, colors , price, totalQty, brand }= req.body;

    const productExists=await productModel.findOne({name:name});

    if(productExists) throw "Product Already Exists";

    // Found Category
    const categoryModel=mongoose.model("categories");
    const foundCategory=await categoryModel.findOne({name:category});
    if(!foundCategory) throw "Category Not Found,Please create the Category First or check the name of the Category";

    // Found Brand
    const brandModel=mongoose.model("brands");
    const foundBrand=await brandModel.findOne({name:brand.toLowerCase()});
    if(!foundBrand) throw "Brand Not Found,Please create the Brand First or check the name of the Brand";

    const product=await productModel.create({
        name:name,
        description:description,
        category:category,
        sizes:sizes,
        colors:colors,
        user:req.user._id,
        price:price,
        totalQty:totalQty,
        brand:brand,
        images:convertedImages
    });

    //we push the id of newly created product to the product array of category and brand models 
    foundCategory.products.push(product._id);
    //save the category
    await foundCategory.save();

    // push the product to the brand
    foundBrand.products.push(product._id);
    //save the brand
    await foundBrand.save();

    res.status(201).json({
        status:"Success",
        message:"Product Created Successfully",
        product:product
    });

    
}

module.exports=createProduct;