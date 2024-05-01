const cloudinary=require("cloudinary").v2;
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary");

// first we configure cloudinary then we create the storage engine and then using that storage engine we configure multer

//configure cloudinary (cloud name, api key, api secret)
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
});

// create storage Engine for multer 
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    allowedFormats:["jpg","png","jpeg"],
    params:{
        folder:"Ecommerce-api",
    }
})


//Init multer with storage engine
const upload=multer({
    storage:storage
});

module.exports=upload;