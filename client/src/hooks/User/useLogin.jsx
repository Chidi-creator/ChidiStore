import {toast} from 'react-toastify'
import axios from "../../api/axios";
import { useState } from "react";
import useAuth from "../useAuth";
const LOGIN_URL = '/users/auth'


const useLogin = () => {
    const[error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuth()

    const loginUser = async (email, password) =>{
        const userParameters = {email, password}

        try{
            setIsLoading(true)
            const response = await axios.post(
                LOGIN_URL,
                userParameters
            )
            setError(null)
            login(response.data)
            console.log(response.data)
            toast.success(`Welcome ${response.data.username}`)
        }catch(err){
            if(err?.response?.data?.message){
                setError(err.response.data.message)
                console.log(err.response.data.message)
                toast.error(err.response.data.message)
            }else{
                setError('An Error occured. Please try again')
                toast.error('An Error occured. Please try again')
            }
        }finally {
            setIsLoading(false)
        }

    }


    return {loginUser, error, isLoading}
}
 
export default useLogin;