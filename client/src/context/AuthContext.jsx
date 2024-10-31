import axios from "../api/axios";
import { useState, createContext, useEffect } from "react";
import { userStore } from "../stores/userStores";
import { useStore } from "@nanostores/react";
import { useNavigate } from "react-router";
export const AuthContext = createContext();

const LOGOUT_URL = '/users/logout'
const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userInfo = useStore(userStore);
  const navigate = useNavigate()

  const handleLogout = async () =>{
    try{
      const response = await axios.post(LOGOUT_URL)
      console.log(response.data)
    }catch(err){
      console.log(err.message)
    }

  }


  const login = (data) => {
    userStore.set(data);
    setIsLoggedIn(true);
    navigate('/login')

  };

  const logout = async () => {
  await handleLogout()
    userStore.set({})
    localStorage.clear()
    setIsLoggedIn(false)

  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
