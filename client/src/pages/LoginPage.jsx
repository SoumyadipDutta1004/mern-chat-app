import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { TbUser } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { LuLoaderCircle, LuLock } from "react-icons/lu";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";


import useAuthStore from "../store/useAuthStore";
import InputBox from "../components/InputBox";
import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "sonner";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    await login(data);
    reset();
  }

  useEffect(() => {
    if (errors.fullName) {
      toast.error(errors.fullName.message);
      return;
    }
    if (errors.email) {
      toast.error(errors.email.message);
      return;
    }
    if (errors.password) {
      toast.error(errors.password.message);
      return;
    }
  }, [errors.password, errors.email, errors.fullName]);

  if(isLoggingIn){
    return <div className="flex justify-center items-center h-screen">
      <LuLoaderCircle className="size-10 animate-spin" />
    </div>;
  }
  

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-4 lg:p-12">
        <div className="flex flex-col items-center">
          <div>

          </div>
          <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
          <p className="text-base-content/60">Sign in to your account</p>
        </div>

        <form className="md:w-1/2 flex flex-col space-y-4 mt-8">

          <InputBox
            icon={<HiOutlineMail className="text-xl text-neutral-500" />}
            label="Email"
            type="text"
            placeholder="your@gmail.com"
            register={{ ...register("email", { required: "Email is required" }) }}
          />
          <InputBox
            icon={<LuLock className="text-lg text-neutral-500" />}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            register={{ ...register("password", { required: "Password is required" }) }}
            showPasswordIcon={showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            showPassword={{ showPassword, setShowPassword }}
          />

          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-blue-600 text-white py-2 px-4 mt-4 rounded-lg w-full cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="text-neutral-400 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};