import React, { useEffect, useState } from 'react';
import { Alert, Table, Button, Modal } from "flowbite-react";
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';

const DashManageProducts = () => {

    const [products, setProducts] = useState([]);

    const { currentUser } = useSelector(state => state.user);

    const [successMessage, setSuccessMessage] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setIsLoading(true);

                const response = await fetch(`/api/products/GetAllProducts`);

                const json = await response.json();

                if (response.ok) {

                    setProducts(json.products);
                    console.log("Products :",json.products);

                    setIsLoading(false);

                } else {

                    console.log(json.error);
                    setErrorMessage(json.error);

                    setIsLoading(false);
                }

            } catch (error) {
                console.log(error);
            }

        }

        if (currentUser.isAdmin) {

            fetchProducts();
        }


    }, []);

    const [openModal, setOpenModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState({});

    const handleDeleteProduct = async (productId) => {

        setOpenModal(false);

        try {

            const response = await fetch(`/api/products/DeleteProduct/${productId}`, {
                method: "DELETE",
            });

            const json = await response.json();

            if (response.ok) {

                setProducts(products.filter(product => product._id !== productId));
                setSuccessMessage(json.message)

            } else {

                console.log(json.error);
                setErrorMessage(json.error)
            }

        } catch (error) {
            console.log(error);
        }


    }
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

            {isLoading ? (
                <p>Loading...</p>
            ) : (



                currentUser.isAdmin && products.length > 0 ? (
                    <>
                        <Table hoverable>

                            <Table.Head>
                                <Table.HeadCell>Product name</Table.HeadCell>
                                <Table.HeadCell>Brand</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                <Table.HeadCell>Quantity Left</Table.HeadCell>
                                <Table.HeadCell>Price</Table.HeadCell>
                                <Table.HeadCell>Reviews</Table.HeadCell>
                                <Table.HeadCell>
                                    <span >Edit</span>
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    <span className='text-red-500'>Delete</span>
                                </Table.HeadCell>
                            </Table.Head>

                            {products && products.map((product) => (
                                <Table.Body key={product._id} className="divide-y">
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {product.name}
                                        </Table.Cell>
                                        <Table.Cell>{product.brand}</Table.Cell>
                                        <Table.Cell>{product.category}</Table.Cell>
                                        <Table.Cell>{product.totalQty}</Table.Cell>
                                        <Table.Cell>{product.price}</Table.Cell>
                                        <Table.Cell>{product.reviews.length}</Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/dashboard?tab=updateProduct&productId=${product._id}`}  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                Edit
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell onClick={() => {
                                            setOpenModal(true);
                                            setSelectedProduct(product._id);
                                        }} className="font-medium  hover:underline text-red-500 cursor-pointer">
                                            Delete
                                        </Table.Cell>
                                    </Table.Row>


                                </Table.Body>
                            ))}
                            {successMessage && <Alert color={"success"}>{successMessage}</Alert>}
                            {errorMessage && <Alert color={"failure"}>{errorMessage}</Alert>}
                        </Table>
                    </>

                ) : (
                    <h1 className='flex items-center justify-center text-center m-5'>No Products Found</h1>
                )


            )}


            {/* Delete Modal */}

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleDeleteProduct(selectedProduct)}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashManageProducts;
