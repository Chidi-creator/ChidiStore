import { toast } from "react-toastify";
import axios from "../../api/axios";
import { useState } from "react";
import useAuth from "../useAuth";

const UPDATE_URL = "/users/profile";

const useUpdateProfile = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const updateProfile = async (username, email, password) => {
    const userParameters = { username, email, password };

    try {
      setIsLoading(true);
      const response = await axios.put(UPDATE_URL, userParameters);
      setError(null);
      login(response.data);
      console.log(response.data);
      toast.success(`User Profile Succcessfully updated`);
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError("An Error occured. Please try again");
        toast.error("An error occured. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
};

export default useUpdateProfile;
