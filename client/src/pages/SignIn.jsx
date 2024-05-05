import React, { useState } from 'react';
import { TextInput, Label, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../Redux/userReducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {

    const dispatch=useDispatch();
    const{isLoading,error}=useSelector(state=>state.user);

    const[formData,setFormData]=useState({
        email:'',
        password:''
    })

    const changeHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        try{

            dispatch(signInStart());

            const response=await fetch(`https://mern-ecommerce-backend-one.vercel.app/api/auth/signin`,{
                method:'POST',
                body:JSON.stringify(formData),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            
            const json=await response.json();

            if(response.ok){
                console.log(formData);
                dispatch(signInSuccess(json.user))
            }else{
                console.log(json.error);
                dispatch(signInFailure(json.error))
            }

        }catch(error){
            console.log(error.message);
        }
        
        
    };


  return (
    <div className="min-h-screen mt-20">

            <div className='flex mx-auto gap-5  flex-col md:flex-row md:items-center  max-w-4xl p-3'>

                <div className='flex-1'>
                    <h1 className='text-xl font-semibold '>Ecommerce Web App</h1>
                    <p className='text-sm '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut suscipit sed adipisci fuga, eaque dolorem officia nostrum consequatur consequuntur. Aliquam odit nostrum non eius in corporis, dignissimos optio similique quisquam?</p>
                </div>


                <div className='flex-1'>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">

                        <h2 className="text-center text-2xl font-semibold mb-4 italic">SignIn to Your Account</h2>

                        <div>
                            <Label value='Enter Your Email Address' />
                            <TextInput type='email' placeholder='Enter Your Email here...' name="email" value={formData.email} onChange={changeHandler} />
                        </div>

                        <div>
                            <Label value='Enter Your Password' />
                            <TextInput type='password' placeholder='Enter Your Password here...' name='password' value={formData.password} onChange={changeHandler} />
                        </div>
                        <Button disabled={isLoading} outline gradientDuoTone={"purpleToBlue"} type="submit" className='italic'>Create Account</Button>

                        {error && <p className='text-red-500'>{error}</p>}

                    </form>
                    <div className="flex gap-2 mt-2 text-sm px-4">
                        <span>Don't Have an Account?</span>
                        <Link to='/sign-up' className="text-blue-500">Sign Up</Link>
                    </div>

                </div>

            </div>

        </div>
  )
}

export default SignIn;
