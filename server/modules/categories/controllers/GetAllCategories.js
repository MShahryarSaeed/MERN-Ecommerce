const mongoose = require("mongoose");

const GetAllCategories = async (req, res) => {

    const categoryModel = mongoose.model("categories");

    const categories = await categoryModel.find({});
    
    res.status(200).json({
        status: "Success",
        message: "Category Listed Successfully",
        categories: categories
    })

}

module.exports = GetAllCategories;