import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section - Welcome Message */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-black px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome to E-commerce Website
          </h1>
        </div>
      </div>

      {/* Right Section - Outlet (Login/Register) */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-12">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
