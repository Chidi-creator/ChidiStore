import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";

//private route
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "",
        element: <PrivateRoute />,
        children: [{ path: "profile", element: <Profile /> }],
      },
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {path:"userlist", element: <UserList />},
          {path: 'categorylist', element:<CategoryList />}
        
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
