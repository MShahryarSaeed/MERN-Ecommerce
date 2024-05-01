const jsonwebtoken=require("jsonwebtoken");

const verifyUser=(req,res,next)=>{

    const accessToken=req.cookies.accessToken;

    if(!accessToken) throw "AccessToken is Required";

    jsonwebtoken.verify(accessToken,process.env.JWT_SECRET,(error,user)=>{

        if(error){
            return res.status(401).json({
                status:"Failed",
                error:"Unauthorized Access"
            })
        }

        req.user=user;
        next();
    })


}

module.exports=verifyUser;