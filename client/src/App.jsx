import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

function Root() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

export default Root;