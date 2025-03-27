import { Outlet } from "react-router";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import useAuthStore from "./store/useAuthStore";
import { Loader } from "lucide-react";
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
  
  console.log({ authUser });

  if(isCheckingAuth && !authUser){
    return <div className="flex justify-center items-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>;
  }
  

  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
}
