const mongoose=require("mongoose");


const createBrand = async (req, res) => {

    const brandModel = mongoose.model("brands");
    
    if (!req.user.isAdmin) throw "You are Not Allowed to Create Brand,Only Admins Can Create Brand";
    const { name } = req.body;

    const brand = await brandModel.create({
        name: name.toLowerCase(),
        user: req.user._id
    });

    res.status(201).json({
        status: "Success",
        message: "Brand Created Successfully",
        brand: brand
    });
}

const GetAllBrands=async(req,res)=>{
    const brandModel = mongoose.model("brands");

    const brands=await brandModel.find({});

    if(!brands) throw "Brands Not Found";

    res.status(200).json({
        status:"Success",
        message:"Brands Listed Successfully",
        brands:brands
    })

}

const GetSingleBrand=async(req,res)=>{

    const brandModel = mongoose.model("brands");

    const{brandId}=req.params;
    const brand=await brandModel.findById(brandId);

    if(!brand) throw "Brand Not Found";

    res.status(200).json({
        status:"Success",
        message:"Brand Fetched Successfully",
        brand:brand
    })
}

const UpdateBrand=async(req,res)=>{
    const brandModel = mongoose.model("brands");

    const{brandId}=req.params;
    if(!req.user.isAdmin) throw "You are Not Allowed to Update Brand";
    const { name } = req.body;

    const brand = await brandModel.findByIdAndUpdate(brandId ,{name}, {new:true});
    if(!brand) throw "Brand Not Found";

    res.status(200).json({
        status:"Success",
        message:"Brand Updated Successfully",
        updatedBrand:brand
    })
}

const DeleteBrand=async(req,res)=>{
    const brandModel = mongoose.model("brands");

    const{brandId}=req.params;
    if(!req.user.isAdmin) throw "You are Not Allowed to Delete Brand";

    const brand = await brandModel.findByIdAndDelete(brandId);
    if(!brand) throw "Brand Not Found";

    res.status(200).json({
        status:"Success",
        message:"Brand Deleted Successfully",
        DeletedBrand:brand
    });
}

module.exports={createBrand,GetAllBrands,GetSingleBrand,UpdateBrand,DeleteBrand}