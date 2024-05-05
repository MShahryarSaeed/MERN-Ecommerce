import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <Navbar fluid rounded>
            <Navbar.Brand to="/">
                <img src="/Logo-removebg-preview.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MERN Ecommerce</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Orders Status</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>

                <Navbar.Link active as={"div"}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>

                <Navbar.Link as={"div"}>
                <Link to='/'>About</Link>
                </Navbar.Link>

                <Navbar.Link as={"div"}>
                <Link to='/'>Services</Link>
                </Navbar.Link>

                <Navbar.Link as={"div"}>
                     <Link to='/'>Pricing</Link>
                </Navbar.Link>

                <Navbar.Link as={"div"}>
                    <Link to='/'>Contact</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default Header;
