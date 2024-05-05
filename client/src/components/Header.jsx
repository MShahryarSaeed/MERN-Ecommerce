import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {signoutUserStart, signoutUserSuccess,signoutUserFailure } from "../Redux/userReducers/userSlice";
import { changeTheme } from "../Redux/theme/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);


    const handleSignout = async () => {

        try {
            dispatch(signoutUserStart());

            const response = await fetch(`/api/auth/signout`, {
                method: 'POST'
            });

            const json = await response.json();

            if (response.ok) {
                dispatch(signoutUserSuccess());
                navigate("/sign-in");
            } else {
                console.log(json.error);
                dispatch(signoutUserFailure(json.error))
            }


        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <Navbar fluid rounded>
            <Navbar.Brand to="/">
                <img src="/Logo-removebg-preview.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white italic">MERN <span className="md:inline hidden">Ecommerce</span></span>
            </Navbar.Brand>
            <div className="flex items-center gap-4 md:order-2">
                {currentUser ? (
                    <>
                        <Button className="h-10 w-12 inline " color={"gray"} pill onClick={() => dispatch(changeTheme())}>{theme === 'light' ? <FaMoon /> : <FaSun />}</Button>
                        
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img={currentUser.profilePicture} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{currentUser.fullname}</span>
                                <span className="block truncate text-sm font-medium">{currentUser.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item>Profile</Dropdown.Item>
                            <Dropdown.Item>Orders Status</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </>


                ) : (
                    <Button outline gradientDuoTone={"purpleToBlue"}><Link to="/sign-in">SignIn</Link></Button>
                )}
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
