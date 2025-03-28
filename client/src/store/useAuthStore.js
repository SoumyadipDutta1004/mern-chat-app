import { create } from 'zustand';

import axiosInstance from '../utils/axios.js';
import { toast } from 'sonner';


const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check');
      set({authUser: response.data});
    } 
    catch (err) {
      console.error(`Error in checkAuth: ${err}`);
      set({authUser: null});
    }
    finally{
      set({isCheckingAuth: false});
    }
  },
  signup: async (data) => {
    try {
      set({isSigningUp: true});
      const response = await axiosInstance.post('/auth/signup', data);
      toast.success('Account created successfully');
      set({authUser: response.data});
    } 
    catch (err) {
      toast.error(err.response.data.message);
    }
    finally {
      set({isSigningUp: false});
    }
  },
  login: async (data) => {
    try {
      set({isLoggingIn: true});
      const response = await axiosInstance.post('/auth/login', data);
      toast.success('Logged in successfully');
      set({authUser: response.data});
    } 
    catch (err) {
      toast.error(err.response.data.message);
    }
    finally {
      set({isLoggingIn: false});
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({authUser: null});
      toast.success('Logged out successfully');
    } 
    catch (err) {
      console.error(`Error in logout: ${err}`);
      toast.error(err.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({isUpdatingProfile: true});
    try {
      const response = await axiosInstance.put('/auth/update-profile', data);
      toast.success('Profile updated successfully');
      set({authUser: response.data});
    } 
    catch (err) {
      console.error(`Error in updateProfile: ${err}`);
      toast.error(err.message);
    }
    finally {
      set({isUpdatingProfile: false});
    }
  }
}));

export default useAuthStore;