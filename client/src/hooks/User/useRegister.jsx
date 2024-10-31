import {toast} from 'react-toastify'
import axios from "../../api/axios";
import { useState } from "react";
import useAuth from "../useAuth";


const REGISTER_URL = "/users";

const useRegister = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const registerUser = async (username, email, password) => {
    const userParameters = { username, email, password };
    try {
      setIsLoading(true);
      const response = await axios.post(REGISTER_URL, userParameters);
      setError(null);
      login(response.data);
      console.log(response.data);
      toast.success(`User successfully registered`)
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
        console.log(err.response.data.message);
        toast.error(err.response.data.message)
      } else {
        setError("An Error occured. Please try again");
        toast.error("An error occured. Please try again")
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, error, isLoading };
};

export default useRegister;
