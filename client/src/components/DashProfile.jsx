import { useState } from 'react';
import { Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';

const DashProfile = () => {

    // const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        fullname: currentUser.fullname,
        email: currentUser.email,
        password: '',
        profilePicture: null
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formDataToSend = new FormData();

            if(formData.fullname!==currentUser.fullname){
                formDataToSend.append('fullname', formData.fullname);
                console.log("Name :",formData.fullname);
            }

            if(formData.email !==currentUser.email){
                formDataToSend.append('email', formData.email);
                console.log("E :",formData.email);
            }

            if (formData.password !=='') {
                formDataToSend.append('password', formData.password);
                console.log( "Password:",formData.password);
            }
            
            if(formData.profilePicture!==null){
                formDataToSend.append('profilePicture', formData.profilePicture);
                console.log( "Picture :",formData.profilePicture);
            }

            

            // console.log(formDataToSend);
            

            const response = await fetch(`/api/users/updateProfile/${currentUser._id}`, {
                method: 'PUT',
                body: formDataToSend
            });

            if (response.ok) {
                // Update user information in Redux store
                // const updatedUser = await response.json();
                // dispatch({ type: 'UPDATE_USER', payload: updatedUser.user });
                console.log("User updated successfully");
            } else {
                const error = await response.json();
                console.log(error.error);
            }


        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='mx-auto w-full max-w-lg p-3'>
            <h1 className='text-xl text-center italic my-4 font-semibold'>Update Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} placeholder="Full Name" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <Button type='submit'>Update Profile</Button>
            </form>
        </div>
    );
};

export default DashProfile;
