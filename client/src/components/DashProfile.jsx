import { Button } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const DashProfile = () => {

    const { currentUser } = useSelector(state => state.user);
    const filePickerRef=useRef();

    const[formData,setFormData]=useState({
        fullname:'',
        email:'',
        password:'',
        profilePicture:''
    });

    const handleImageChange=(e)=>{
        setFormData({...formData,profilePicture:e.target.files[0]});
    }

    const submitHandler=async(e)=>{

        e.preventDefault();

        try{

            const response=await fetch(`http://localhost:3000/api/users/updateProfile/${currentUser._id}`,{
                method:'PUT',
                body:JSON.stringify(formData),
                headers:{
                    'Content-Type':'application/file'
                }
            });

            const json=await response.json();

            if(response.ok){
                console.log(formData);
                console.log("Success");
            }else{
                console.log(json.error);
            }

        }catch(error){
            console.log(error.message);
        }

       
    }

    return (
        <div className='mx-auto w-full max-w-lg p-3'>

            <h1 className='text-xl text-center italic my-4 font-semibold'>Profile Section</h1>

            <form className='flex flex-col gap-4' onSubmit={submitHandler}>

            <input ref={filePickerRef} type="file" accept="image/*" onChange={handleImageChange} hidden />

                <div className="relative h-32 w-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md"
                    onClick={() => filePickerRef.current.click()}>
                    <img
                        className={`h-full w-full rounded-full border-8 border-[lightgray] object-cover `}
                        src={currentUser.profilePicture}
                        alt={currentUser.fullname}
                    />
                </div>

                <Button type='submit'>Update Profile</Button>

            </form>

        </div>
    )
}

export default DashProfile
