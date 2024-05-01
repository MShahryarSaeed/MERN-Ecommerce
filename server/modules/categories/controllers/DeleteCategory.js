const mongoose = require("mongoose");

const DeleteCategory = async (req, res) => {

    if (!req.user.isAdmin) throw "You are Not Allowed to Delete Category";

    const { categoryId } = req.params;
    const categoryModel = mongoose.model("categories");
  
    const category = await categoryModel.findByIdAndDelete({ _id: categoryId });
    if (!category) throw "Category Not Found";
    
    res.status(200).json({
        status: "Success",
        message: "Category Deleted Successfully",
        DeletedCategory: category
    });

}

module.exports = DeleteCategory