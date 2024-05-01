const mongoose=require("mongoose");

const createColor=async(req,res)=>{

    const colorModel=mongoose.model("colors");
    if(!req.user.isAdmin) throw "You are Not Allowed to Create Color";
    const{name}=req.body;

    const color=await colorModel.create({
        name:name.toLowerCase(),
        user: req.user._id
    });

    res.status(201).json({
        status:"Success",
        message:"Color Created Successfully",
        color:color
    })
}

const GetAllColors=async(req,res)=>{

    const colorModel=mongoose.model("colors");
    const colors=await colorModel.find({});

    if(!colors) throw "Colors Not Found";

    res.status(200).json({
        status:"Success",
        message:"Colors Listed Successfully",
        colors:colors
    })
}

const GetSingleColor=async(req,res)=>{

    const colorModel=mongoose.model("colors");
    const {colorId}=req.params;

    const color=await colorModel.findById(colorId);
    if(!color) throw "Color Not Found";

    res.status(200).json({
        status:"Success",
        message:"Color Fetched Successfully",
        color:color
    })
}

const UpdateColor=async(req,res)=>{
    const colorModel=mongoose.model("colors");
    if(!req.user.isAdmin) throw "You are Not Allowed to Update Color";
    const {colorId}=req.params;
    const {name}=req.body;
    
    let color=await colorModel.findByIdAndUpdate(
        {_id:colorId},
        {
            $set:{
                name:name
            }
        },
        {
            new:true
        }
    )

    if(!color) throw "Color Not Found";

    res.status(200).json({
        status:"Success",
        message:"Color Updated Successfully",
        updatedColor:color
    });

}

const DeleteColor=async(req,res)=>{

    const colorModel=mongoose.model("colors");
    if(!req.user.isAdmin) throw "You are Not Allowed to Delete Color";
    const {colorId}=req.params;

    const color=await colorModel.findByIdAndDelete({_id:colorId});
    if(!color) throw "Color Not Found";

    res.status(200).json({
        status:"Success",
        message:"Color Deleted Successfully",
        DeletedColor:color
    })
}

module.exports={createColor,GetAllColors,GetSingleColor,UpdateColor,DeleteColor}