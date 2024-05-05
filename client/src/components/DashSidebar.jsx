import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link,useLocation  } from "react-router-dom";
import { useEffect, useState } from "react"

const DashSidebar = () => {

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
                    <Sidebar.Item as={"div"} icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item as={"div"} active={tab==='profile'}  icon={HiViewBoards} label="Pro" labelColor="dark">
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item href="#" icon={HiInbox} label="3">
                        Inbox
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiUser}>
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        Products
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiArrowSmRight}>
                        Sign In
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiTable}>
                        Sign Up
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar
