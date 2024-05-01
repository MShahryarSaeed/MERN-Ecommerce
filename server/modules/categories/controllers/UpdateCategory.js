const mongoose = require("mongoose");

const UpdateCategory = async (req, res) => {

    if (!req.user.isAdmin) throw "You are Not Allowed to Update Category";

    const { categoryId } = req.params;
    const { name } = req.body;
    const categoryModel = mongoose.model("categories");

    const category = await categoryModel.findByIdAndUpdate(
        { _id: categoryId },
        {
            $set: {
                name: name
            }
        },
        { new: true }
    ); 

    if (!category) throw "Category Not Found";

    res.status(200).json({
        status: "Success",
        message: "Category Updated Successfully",
        updatedCategory: category
    });

}

module.exports=UpdateCategory;