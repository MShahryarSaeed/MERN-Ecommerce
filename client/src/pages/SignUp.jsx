import React, { useState } from 'react';
import { TextInput, Label, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const[formData,setFormData]=useState({
        fullname:'',
        email:'',
        password:''
    })

    const changeHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement form submission logic here (create user with only name, email, and password)
        console.log(formData);
    };

    return (

        <div className="min-h-screen mt-20">

            <div className='flex mx-auto gap-5  flex-col md:flex-row md:items-center  max-w-4xl p-3'>

                <div className='flex-1'>
                    <h1 className='text-xl font-semibold text-gray-800'>Ecommerce Web App</h1>
                    <p className='text-sm text-gray-800'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut suscipit sed adipisci fuga, eaque dolorem officia nostrum consequatur consequuntur. Aliquam odit nostrum non eius in corporis, dignissimos optio similique quisquam?</p>
                </div>


                <div className='flex-1'>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">

                        <h2 className="text-center text-2xl font-semibold mb-4 italic">Create Your Account</h2>

                        <div>
                            <Label value='Enter Your Name' />
                            <TextInput type='text' placeholder='Enter Your Name here...' name="fullname" value={formData.fullname} onChange={changeHandler}  />
                        </div>

                        <div>
                            <Label value='Enter Your Email Address' />
                            <TextInput type='email' placeholder='Enter Your Email here...' name="email" value={formData.email} onChange={changeHandler} />
                        </div>

                        <div>
                            <Label value='Enter Your Password' />
                            <TextInput type='password' placeholder='Enter Your Password here...' name='password' value={formData.password} onChange={changeHandler} />
                        </div>
                        <Button outline gradientDuoTone={"purpleToBlue"} type="submit" className='italic'>Create Account</Button>

                    </form>
                    <div className="flex gap-2 mt-2 text-sm px-4">
                        <span>Have an Account?</span>
                        <Link to='/sign-in' className="text-blue-500">Sign In</Link>
                    </div>

                </div>

            </div>

        </div>

    );
};

export default SignUp;
