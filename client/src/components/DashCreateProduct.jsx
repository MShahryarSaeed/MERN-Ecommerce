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

const DashCreateProduct = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        sizes: [], //[]
        colors: [],//[]
        price: "",
        totalQty: "",
        brand: "",
        files: [],
    });

    console.log("FormData :", formData);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Fetch categories and brands from your API
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
                    console.log("Brands :",json.brands);
                    
                } else {
                    console.log(json.error);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser.isAdmin) {
            fetchCategories();
            fetchBrands();
        }
        
    }, [currentUser.isAdmin]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, files: e.target.files, });
    };

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     const data = new FormData();
    //     for (let key in formData) {
    //         if (key === "files") {
    //             for (let i = 0; i < formData.files.length; i++) {
    //                 data.append("files", formData.files[i]);
    //             }
    //         } else {
    //             data.append(key, formData[key]);
    //         }
    //     }

    //     try {
    //         const response = await fetch("/api/products/createProduct", {
    //             method: "POST",
    //             body: data,
    //         });
    //         const json = await response.json();
    //         if (response.ok) {
    //             console.log("Product created successfully:", json);
    //         } else {
    //             console.error("Error creating product:", json.error);
    //         }
    //     } catch (error) {
    //         console.error("Error creating product:", error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in formData) {
            if (key === "files") {
                for (let i = 0; i < formData.files.length; i++) {
                    data.append("files", formData.files[i]);
                }
            } else if (key === "sizes" || key === "colors") {
                // Convert arrays to JSON strings
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch("/api/products/createProduct", {
                method: "POST",
                body: data,
            });
            const json = await response.json();
            if (response.ok) {
                console.log("Product created successfully:", json);
                setSuccessMessage(json.message);
            } else {
                console.error("Error creating product:", json.error);
            }
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };


    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevFormData => {
            if (checked) {
                // Add the size to the array
                return { ...prevFormData, sizes: [...prevFormData.sizes, value] };
            } else {
                // Remove the size from the array
                return { ...prevFormData, sizes: prevFormData.sizes.filter(size => size !== value) };
            }
        });
    };

    const handleColorChange = (e) => {

        const { value, checked } = e.target;
        setFormData((prevFormData) => {
            if (checked) {
                // Add the color to the array
                return { ...prevFormData, colors: [...prevFormData.colors, value] };
            } else {
                // Remove the color from the array
                return {
                    ...prevFormData,
                    colors: prevFormData.colors.filter((color) => color !== value),
                };
            }
        });
    };

    return (

        <div className="mx-auto w-full mb-20">

            <form
                onSubmit={handleSubmit}
                className="mx-auto p-4 max-w-3xl flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold mb-6 text-center italic">
                    Create New Product
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
                        placeholder="Enter Product name here..."
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

                <div >
                    <Label htmlFor="sizes" className='mb-1'>Sizes</Label>
                    <div className="flex flex-wrap gap-2">
                        {["S", "M", "L", "XL", "XXL"].map(size => (
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
                                <Label htmlFor={`size-${size}`} className='mb-0 text-lg'>{size}</Label>
                            </div>
                        ))}
                    </div>
                </div>


                <div>
                    <Label htmlFor="colors" className="mb-1">
                        Colors
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {["Red", "Blue", "Green", "Yellow", "Black", "White"].map(
                            (color) => (
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
                            )
                        )}
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
                        required
                    />
                </div>

                <Button type="submit" outline >
                    Create Product
                </Button>

                {successMessage && <Alert color={"success"}>{successMessage}</Alert>}
            </form>
        </div>
    );
};

export default DashCreateProduct;
