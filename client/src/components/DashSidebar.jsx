import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { TbBrandShopee, TbCategory2 } from "react-icons/tb";
import { SiGoogleanalytics } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const DashSidebar = () => {

    const { currentUser } = useSelector(state => state.user);

    const [tab, setTab] = useState('');
    const location = useLocation();

    useEffect(() => {

        const URLParams = new URLSearchParams(location.search);

        const tabFromURL = URLParams.get("tab");

        if (tabFromURL) {
            setTab(tabFromURL)
        }

    }, [location.search])


    return (
        <Sidebar aria-label="Default sidebar example" className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-4'>

                    <Sidebar.Item as={"div"} icon={SiGoogleanalytics}>
                        Dashboard
                    </Sidebar.Item>

                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item as={"div"} active={tab === 'profile'} icon={CiUser} labelColor="dark" >
                            Profile
                        </Sidebar.Item>
                    </Link>

                    {currentUser.isAdmin &&
                        <Sidebar.Collapse icon={HiShoppingBag} label="Products" as={"div"}>
                            <Link to={'/dashboard?tab=createProduct'}>
                                <Sidebar.Item as={"div"} >Add New Product</Sidebar.Item>
                            </Link>
                            <Sidebar.Item as={"div"}>
                                <Link to={'/dashboard?tab=manageProducts'}>Manage Products</Link>
                            </Sidebar.Item>
                            <Sidebar.Item href="#">Refunds</Sidebar.Item>
                            <Sidebar.Item href="#">Shipping</Sidebar.Item>
                        </Sidebar.Collapse>
                    }


                    {currentUser.isAdmin &&
                        <Sidebar.Collapse icon={TbBrandShopee} label="Brands" as={"div"}>
                            <Link to={'/dashboard?tab=createBrand'}>
                                <Sidebar.Item as={"div"} >Add New Brand</Sidebar.Item>
                            </Link>
                            <Sidebar.Item as={"div"}>
                                <Link to={'/dashboard?tab=manageBrands'}>Manage Brands</Link>
                            </Sidebar.Item>
                            <Sidebar.Item href="#">Refunds</Sidebar.Item>
                            <Sidebar.Item href="#">Shipping</Sidebar.Item>
                        </Sidebar.Collapse>
                    }


                    {currentUser.isAdmin &&
                        <Sidebar.Collapse icon={TbCategory2} label="Categories" as={"div"}>
                            <Link to={'/dashboard?tab=createCategory'}>
                                <Sidebar.Item as={"div"} >Add New Category</Sidebar.Item>
                            </Link>
                            <Sidebar.Item as={"div"}>
                                <Link to={'/dashboard?tab=manageCategories'}>Manage Categories</Link>
                            </Sidebar.Item>
                            <Sidebar.Item href="#">Refunds</Sidebar.Item>
                            <Sidebar.Item href="#">Shipping</Sidebar.Item>
                        </Sidebar.Collapse>
                    }


                    {currentUser.isAdmin && (
                        <Link to={'/dashboard?tab=users'}>
                            <Sidebar.Item as={"div"} icon={HiUser}>
                                Users
                            </Sidebar.Item>
                        </Link>
                    )

                    }

                    <Sidebar.Item href="#" icon={HiArrowSmRight}>
                        Sign Out
                    </Sidebar.Item>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar
