import { toast } from "react-toastify";
import axios from "../../api/axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const USERS_URL = "/users";

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(USERS_URL);
      console.log(response.data);
      setUsers(response.data);
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

  const deleteUsers = async (id) => {
    const DELETE_URL = `users/${id}`
    try{
        const response = await axios.delete(DELETE_URL)
        console.log(response.data)
        const updatedUsers = users.filter(user => user._id != id)
        setUsers(updatedUsers)
    }catch(err){
        setError("An Error occured. Please try again");
        toast.error("An error occured. Please try again");
    }
  };
  const editArray = (updatedUsername, updatedEmail, id) =>{

    const updatedUsers = users.map(user => 
        user._id === id 
          ? { ...user, username: updatedUsername, email: updatedEmail } 
          : user
      );
      
      setUsers(updatedUsers); // Update the state with the new array
  }


  return { isLoading, fetchUsers, users, error, deleteUsers, editArray };
};

export default useGetUsers;
