import { useRef, useState } from 'react';
import { Alert, Button, TextInput, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, signoutUserStart, signoutUserSuccess, signoutUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../Redux/userReducers/userSlice'
import { useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi";


const DashProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, isLoading, error } = useSelector(state => state.user);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState(null);

    const [formData, setFormData] = useState({
        fullname: currentUser.fullname,
        email: currentUser.email,
        password: '',
        profilePicture: null
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [imageFileUrl, setImageFileURL] = useState(null); //To temporary set the Picture on Profile
    const filePicker = useRef();



    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setFormData({ ...formData, profilePicture: file });
        setImageFileURL(URL.createObjectURL(file))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formDataToSend = new FormData();

            if (formData.fullname !== currentUser.fullname) {
                formDataToSend.append('fullname', formData.fullname);
            }

            if (formData.email !== currentUser.email) {
                formDataToSend.append('email', formData.email);
            }

            if (formData.password !== '' && formData.password.length >= 8) {

                formDataToSend.append('password', formData.password);

            } 

            if (formData.profilePicture !== null) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }


            if (formDataToSend.entries().next().done) {
                setErrors("Nothing Upadted,Update Anything to update Your Profile information");
                setTimeout(() => setErrors(null), 3000)
                return;
            }

            dispatch(updateUserStart());




            const response = await fetch(`/api/users/updateProfile/${currentUser._id}`, {
                method: 'PUT',
                body: formDataToSend
            });

            const json = await response.json();

            if (response.ok) {
                setMessage(json.message);
                setTimeout(() => setMessage(''), 3000)
                dispatch(updateUserSuccess(json.user));
            } else {
                dispatch(updateUserFailure(json.error))
                console.log(error.error);
            }


        } catch (error) {
            console.error(error.message);
        }
    };

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

    const [openModal, setOpenModal] = useState(false);

    const handleDelete = async () => {

        try {

            dispatch(deleteUserStart());

            const response = await fetch(`/api/users/deleteuser/${currentUser._id}`, {
                method: 'DELETE'
            });

            const json = await response.json();

            if (response.ok) {
                dispatch(deleteUserSuccess());
                navigate("/sign-in")

            } else {
                dispatch(deleteUserFailure(json.error))
            }

        } catch (error) {

        }
    }

    return (
        <div className='mx-auto w-full max-w-lg p-3 mt-20'>

            <h1 className='text-2xl text-center italic my-4 font-semibold'>Update Profile</h1>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit} hidden>

                <input type="file" accept="image/*" onChange={handleImageChange} hidden ref={filePicker} />
                <div onClick={() => filePicker.current.click()} className="relative h-32 w-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md">
                    <img src={imageFileUrl || currentUser.profilePicture}
                        className={`h-full w-full rounded-full border-8 border-[lightgray] object-cover `}
                        alt={currentUser.fullname}
                    />
                </div>
                <TextInput type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} placeholder="Full Name" />
                <TextInput type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                <TextInput type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter new Password here..." />

                <Button outline gradientDuoTone={"purpleToPink"} disabled={isLoading} type='submit'>
                    {isLoading ? 'Updating...' : 'Update Profile'}
                </Button>



            </form>
            <div className='flex justify-between text-sm mt-2 cursor-pointer'>
                <span onClick={() => setOpenModal(true)} className='text-red-500'>Delete Account ?</span>
                <span onClick={handleSignout} className='text-red-500'>Signout</span>
            </div>
            {error && <Alert className='mt-2' color={"failure"}>{error}</Alert>}
            {message && <Alert className='mt-2' color={"success"}>{message}</Alert>}
            {errors && <Alert className='mt-2' color={"failure"}>{errors}</Alert>}


            {/* Delete Modal */}

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete Your Account?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDelete}>
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
    );
};

export default DashProfile;
