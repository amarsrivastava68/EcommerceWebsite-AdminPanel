import CommonForm from '@/components/common/form'
import { loginFormControls  } from '@/config'
import { loginUser } from '@/store/auth-slice'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
const Login = () => {
    const initialState  = {
        userName : "" , 
        email  : "" , 
        password : "" 
    }
    const { toast } = useToast();
    const [ formData , setFormData] = useState(initialState )
    const dispatch = useDispatch()
    function onSubmit (event ) {

            event.preventDefault()
             dispatch(loginUser(formData)).then(data => {
              if (data?.payload?.success ) {
                toast({ title: data?.payload?.message });
              }
              else {
                toast({ title: data?.payload?.message , variant : "destructive" });
              }
             })

    }
  return (
    <div className='mx-auto w-full max-w-md space-y-6 '>
        <div className='text-center '>
            <h1 className='text-3xl font-bold text-foreground tracking-tight '>Login here </h1>
        <p className='mt-2'>Dont have an account ? <Link className='font-medium  ml-2 text-primary hover:underline' to = '/auth/register'>Create new  </Link></p>
        
        </div>
        <CommonForm onSubmit={onSubmit} formControls={loginFormControls} formData={formData} setFormData={setFormData} buttonText='Login'/>
    </div>
  )
}

export default Login