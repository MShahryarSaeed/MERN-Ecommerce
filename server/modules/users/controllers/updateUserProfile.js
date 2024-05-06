// const userModel=require("../../../models/user.model");

// const updateUserProfile=async(req,res)=>{

//     const {userId}=req.params;
    
//     if(req.user._id!==userId) throw "You are not Allowed to Update this User";

//     const user=await  userModel.findByIdAndUpdate(
//         userId,
//         {
//             $set:{
//                 fullname:req.body.fullname,
//                 email:req.body.email,
//                 password:req.body.password,
//                 profilePicture:req.file.path 
//             }
//         },
//         {
//             new:true
//         }
//     );

//     if(!user) throw "User Not Found";

//     res.status(200).json({
//         status:"Success",
//         message:"User Updated Successfully",
//         user:user
//     })

// }

// module.exports=updateUserProfile;

const userModel = require("../../../models/user.model");
const bcryptjs=require("bcrypt");

const updateUserProfile = async (req, res) => {
    const { userId } = req.params;

    if (req.user._id !== userId) throw "You are not Allowed to Update this User";

    if(req.body.password){
        req.body.password=await bcryptjs.hash(req.body.password,10);
    }

    let updateFields = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    };

    // Check if a new profile picture was uploaded
    if (req.file) {
        updateFields.profilePicture = req.file.path;
    }

    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true }
        );

        if (!user) throw "User Not Found";

        res.status(200).json({
            status: "Success",
            message: "User Updated Successfully",
            user: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = updateUserProfile;
