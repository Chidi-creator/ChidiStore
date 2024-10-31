import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const AdminRoute = () => {
    const {userInfo} = useAuth()


  return userInfo && userInfo.isAdmin ? (<Outlet /> ) : <Navigate to='/login' replace />
};

export default AdminRoute;