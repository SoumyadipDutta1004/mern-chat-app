import { create } from 'zustand';
import axiosInstance from '../utils/axios.js';


const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  inUpdatingProfile: false,
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
  }
}));

export default useAuthStore;