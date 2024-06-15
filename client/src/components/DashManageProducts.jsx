import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { useSelector } from 'react-redux';

const DashManageProducts = () => {

    const [products, setProducts] = useState([]);

    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await fetch(`/api/products/GetAllProducts`);

                const json = await response.json();

                if (response.ok) {

                    setProducts(json.products);
                    console.log(json.products);

                } else {

                    console.log(json.error);
                }

            } catch (error) {
                console.log(error);
            }

        }

        if (currentUser.isAdmin) {

            fetchProducts();
        }


    }, [])
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
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

                {currentUser.isAdmin && products.length > 0 ? (
                    <>

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
                                        <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </a>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <a className="font-medium  hover:underline text-red-500">
                                            Delete
                                        </a>
                                    </Table.Cell>
                                </Table.Row>


                            </Table.Body>
                        ))}

                    </>

                )
                    : (
                        <h1>No Products Found</h1>
                    )}
            </Table>
        </div>
    )
}

export default DashManageProducts;
