import { useEffect, useState } from "react"
import DashSidebar from "../components/DashSidebar"
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {

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
        <div className='min-h-screen flex flex-col  md:flex-row'>
            <div className="md:w-56">
                <DashSidebar />
            </div>

            {tab === 'profile' && <DashProfile />}

        </div>
    )
}

export default Dashboard
