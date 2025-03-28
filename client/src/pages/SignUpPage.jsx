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


export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    await signup(data);
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

  if(isSigningUp){
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
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-neutral-400">Get started with your free account</p>
        </div>

        <form action="" className="md:w-1/2 flex flex-col space-y-4 mt-8">

          <InputBox
            icon={<TbUser className="text-xl text-neutral-500" />}
            label="Full Name"
            type="text"
            placeholder="Your Name"
            register={{ ...register("fullName", { required: "Name is required" }) }}
          />
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
            Sign Up
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="text-neutral-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
