import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Label,
    TextInput,
    Textarea,
    Select,
    Checkbox,
    FileInput,
    Button,
    Alert,
} from "flowbite-react";
import { useLocation } from "react-router-dom";

const DashUpdateProduct = () => {

    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        sizes: [],
        colors: [],
        price: "",
        totalQty: "",
        brand: "",
        files: [],
    });

    console.log("F :", formData);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    const [productId, setProductId] = useState(null);

    useEffect(() => {

        const URLParams = new URLSearchParams(location.search);
        const productId = URLParams.get("productId");


        if (productId) {
            setProductId(productId);
            console.log("Product ID:", productId);
        }

        const fetchProductDetails = async (productId) => {
            try {

                const response = await fetch(`/api/products/GetSingleProduct/${productId}`);

                const json = await response.json();

                if (response.ok) {
                    console.log('Product details fetched successfully:', json.product);
                    setFormData({
                        ...json.product,
                        // sizes: JSON.parse(json.product.sizes),
                        // colors: JSON.parse(json.product.colors),
                        files: [], // Files are not fetched, they need to be re-uploaded
                    });
                } else {
                    console.error('Error fetching product details:', json.error);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchCategories = async () => {
            try {

                const response = await fetch("/api/categories/GetAllCategories");
                const json = await response.json();

                if (response.ok) {
                    setCategories(json.categories);
                } else {
                    console.log(json.error);
                }

            } catch (error) {
                console.log(error);
            }
        };

        const fetchBrands = async () => {
            try {

                const response = await fetch("/api/brands/GetAllBrands");
                const json = await response.json();

                if (response.ok) {
                    setBrands(json.brands);
                } else {
                    console.log(json.error);
                }

            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser.isAdmin && productId) {
            fetchProductDetails(productId);
            fetchCategories();
            fetchBrands();
        }
    }, [currentUser.isAdmin, location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, files: e.target.files }); //All image Files
    };



    const handleSizeChange = (e) => {

        const { value, checked } = e.target;

        setFormData(prevFormData => {
            if (checked) {
                return { ...prevFormData, sizes: [...prevFormData.sizes, value] };
            } else {
                return { ...prevFormData, sizes: prevFormData.sizes.filter(size => size !== value) };
            }
        });
    };

    const handleColorChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => {
            if (checked) {
                return { ...prevFormData, colors: [...prevFormData.colors, value] };
            } else {
                return {
                    ...prevFormData,
                    colors: prevFormData.colors.filter((color) => color !== value),
                };
            }
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        // const URLParams = new URLSearchParams(location.search);
        // const productId = URLParams.get("productId");

        const data = new FormData();
        for (let key in formData) {
            if (key === "files") {
                for (let i = 0; i < formData.files.length; i++) {
                    data.append("files", formData.files[i]);
                }
            } else if (key === "sizes" || key === "colors") {
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        }

        console.log("Data :", data);

        try {
            const response = await fetch(`/api/products/UpdateProduct/${productId}`, {
                method: "PUT",
                body: data,
            });

            const json = await response.json();

            if (response.ok) {
                console.log("Product updated successfully:", json);
                setSuccessMessage(json.message);
            } else {
                console.error("Error updating product:", json.error);
            }
        } catch (error) {
            console.error("Error updating products:", error);
        }
    };

    return (
        <div className="mx-auto w-full mb-20">
            <form
                onSubmit={handleSubmit}
                className="mx-auto p-4 max-w-3xl flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold mb-6 text-center italic">
                    Update Product
                </h2>

                <div>
                    <Label htmlFor="name" className="mb-1">
                        Product Name
                    </Label>
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="description" className="mb-1">
                        Product Description
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter Product Description here..."
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="category" className="mb-1">
                        Categories
                    </Label>
                    <Select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <div>
                    <Label htmlFor="sizes" className="mb-1">
                        Sizes
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <div key={size} className="flex items-center">
                                <Checkbox
                                    type="checkbox"
                                    id={`size-${size}`}
                                    name="sizes"
                                    value={size}
                                    checked={formData.sizes.includes(size)}
                                    onChange={handleSizeChange}
                                    className="mr-2 p-4"
                                />
                                <Label htmlFor={`size-${size}`} className="mb-0">
                                    {size}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <Label htmlFor="colors" className="mb-1">
                        Colors
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {["Red", "Blue", "Green", "Yellow", "Black", "White"].map((color) => (
                            <div key={color} className="flex items-center">
                                <Checkbox
                                    type="checkbox"
                                    id={`color-${color}`}
                                    name="colors"
                                    value={color}
                                    checked={formData.colors.includes(color)}
                                    onChange={handleColorChange}
                                    className="mr-2 p-4"
                                />
                                <Label htmlFor={`color-${color}`} className="mb-0">
                                    {color}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <Label htmlFor="price" className="mb-1">
                        Price
                    </Label>
                    <TextInput
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="Enter the Product Price"
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="totalQty" className="mb-1">
                        Total Quantity
                    </Label>
                    <TextInput
                        type="number"
                        id="totalQty"
                        name="totalQty"
                        value={formData.totalQty}
                        onChange={handleChange}
                        required
                        placeholder="Enter the Quantity "
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="brand" className="mb-1">
                        Brand
                    </Label>
                    <Select
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a brand</option>
                        {brands.map((brand) => (
                            <option key={brand._id} value={brand.name}>
                                {brand.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="mb-4">
                    <Label htmlFor="files" className="mb-1">
                        Product Images
                    </Label>
                    <FileInput
                        type="file"
                        id="files"
                        name="files"
                        onChange={handleFileChange}
                        multiple
                    />
                </div>

                <Button type="submit" outline gradientDuoTone={"purpleToBlue"}>
                    Update Product
                </Button>

                {successMessage && <Alert color={"success"}>{successMessage}</Alert>}
            </form>
        </div>
    );
};

export default DashUpdateProduct;
