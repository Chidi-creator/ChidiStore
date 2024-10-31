import { toast } from "react-toastify";
import axios from "../../api/axios";
import { useState } from "react";
import useAuth from "../useAuth";
import useGetUsers from "./useGetUsers";

const useUpdateUserProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();


  

  const editProfile = async (

    username,
    email,
    id
    
  ) => {
    const UPDATE_URL = `users/${id}`;

    const userParameters = {
      username,
      email
    };
    try {
      const response = await axios.put(UPDATE_URL, userParameters);
      setError(null);
      console.log(response.data);
      toast.success(`User Succcessfully updated`);
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.resposnse.data.message);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError("An Error occured. Please try again");
        toast.error("An error occured. Please try again");
      }
    } 
  };

  return { editProfile, error, isLoading };
};

export default useUpdateUserProfile;
