const userModel=require("../../../models/user.model");

const DeleteUser=async(req,res)=>{

    const{userId}=req.params;

    if(req.user._id!==userId && req.user.isAdmin) throw "You are Not Allowed to Delete this User,Only Admin and the user itself can delete it";

    const user=await userModel.findByIdAndDelete({_id:req.user._id});

    if(!user) throw "User Not Found";

    res.status(200).json({
        status:"Success",
        message:"User Deleted Successfully",
        user:user
    })

}

module.exports=DeleteUser;