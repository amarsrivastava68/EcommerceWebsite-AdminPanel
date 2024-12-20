import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const Register = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(formData);
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      }else{
        toast({ title: data?.payload?.message , variant : "destructive" });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center ">
        <h1 className="text-3xl font-bold text-foreground tracking-tight ">
          Registration for new User{" "}
        </h1>
        <p className="mt-2">
          Already have an account ?{" "}
          <Link
            className="font-medium  ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login here{" "}
          </Link>
        </p>
      </div>
      <CommonForm
        onSubmit={onSubmit}
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText="create New account"
      />
    </div>
  );
};

export default Register;
