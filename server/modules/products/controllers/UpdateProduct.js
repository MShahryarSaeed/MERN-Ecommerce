const mongoose = require("mongoose");

const UpdateProduct = async (req, res) => {

    const { productId } = req.params;
    const productModel = mongoose.model("products");
    if (!req.user.isAdmin) throw "You are Not Allowed to Create Product";

    let { name, description, category, sizes, colors, price, totalQty, brand } = req.body;
    sizes = JSON.parse(sizes);
    colors = JSON.parse(colors);

    console.log("Body :", req.body);

    const updateFields = {
        name: name,
        description: description,
        category: category,
        sizes: sizes,
        colors: colors,
        price: price,
        totalQty: totalQty,
        brand: brand,
    };

    if (req.files && req.files.length > 0) {
        const convertedImages = req.files.map((file) => file.path);
        updateFields.images = convertedImages;
    }

    const product = await productModel.findByIdAndUpdate(
        { _id: productId },
        { $set: updateFields },
        { new: true }
    );

    res.status(200).json({
        status: "Success",
        message: "Product Updated SuccessfullYY",
        Updatedproduct: product
    });

    
}

module.exports = UpdateProduct;
