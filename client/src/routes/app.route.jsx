import { Navigate, Route, Routes } from "react-router";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import SignUpPage from "../pages/SignUpPage";
import AppLayout from "../AppLayout";

import useAuthStore from "../store/useAuthStore";



export default function AppRoute() {

  const { authUser } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<AppLayout />} >
        <Route index element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to='/login' />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to='/login' />} />
      </Route>
    </Routes>
  );
}
