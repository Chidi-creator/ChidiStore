import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
const {userInfo} = useAuth()

    return Object.keys(userInfo).length > 0 ? <Outlet /> : <Navigate to='/login' replace />
}
 
export default PrivateRoute;