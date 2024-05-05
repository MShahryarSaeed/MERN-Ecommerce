const userModel=require("../../../models/user.model");

const updateUserProfile=async(req,res)=>{

    const {userId}=req.params;
    
    if(req.user._id!==userId) throw "You are not Allowed to Update this User";

    const user=await  userModel.findByIdAndUpdate(
        userId,
        {
            $set:{
                fullname:req.body.fullname,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.file.path
            }
        },
        {
            new:true
        }
    );

    if(!user) throw "User Not Found";

    res.status(200).json({
        status:"Success",
        message:"User Updated Successfully",
        user:user
    })

}

module.exports=updateUserProfile;