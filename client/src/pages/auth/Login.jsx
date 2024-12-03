import CommonForm from '@/components/common/form'
import { loginFormControls  } from '@/config'

import React, { useState } from 'react'
import {Link} from 'react-router-dom'
const Login = () => {
    const initialState  = {
        userName : "" , 
        email  : "" , 
        password : "" 
    }
    const [ formData , setFormData] = useState(initialState )

    function onSubmit () {

    }
  return (
    <div className='mx-auto w-full max-w-md space-y-6 '>
        <div className='text-center '>
            <h1 className='text-3xl font-bold text-foreground tracking-tight '>Login here </h1>
        <p className='mt-2'>Dont have an account ? <Link className='font-medium  ml-2 text-primary hover:underline' to = '/auth/register'>Create new  </Link></p>
        
        </div>
        <CommonForm onSubmit={onSubmit} formControls={loginFormControls} formData={formData} setFormData={setFormData} buttonText='create New account'/>
    </div>
  )
}

export default Login