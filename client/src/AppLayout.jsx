import { useEffect } from "react";
import { Outlet } from "react-router";
import { LuLoaderCircle } from "react-icons/lu";

import Navbar from "./components/Navbar";
import useAuthStore from "./store/useAuthStore";
import { Toaster } from "sonner";
// import axiosInstance from "./utils/axios.js";



export default function App() {

  const { 
    authUser, 
    checkAuth, 
    isCheckingAuth 
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  // console.log({ authUser });

  if(isCheckingAuth && !authUser){
    return <div className="flex justify-center items-center h-screen">
      <LuLoaderCircle className="size-10 animate-spin" />
    </div>;
  }
  

  return (
    <div>
      <Toaster richColors position="top-center" closeButton />
      <Navbar />

      <Outlet />
    </div>
  );
}
