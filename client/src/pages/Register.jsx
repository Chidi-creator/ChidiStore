import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import useRegister from "../hooks/User/useRegister";

const Register = () => {
  const { userInfo } = useAuth();
  const { registerUser, error, isLoading } = useRegister();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    console.log(userInfo);
    const isEmptyObject = userInfo && Object.keys(userInfo).length === 0;
    if (userInfo && !isEmptyObject) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await registerUser(username, email, password);
    //   navigate(redirect);
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap ">
      <div className="mr-[1.5rem] mt-[2rem] flex-[0.6]">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <form onSubmit={handleRegister} className=" container w-[30rem]">
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-sm font-medium ">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium "
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Signing Up" : "Sign Up"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p>
            Already have an account? {""}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
          {/* Image Section */}
          <div className="flex-[1.4] flex justify-center items-center pr-2">
          <img
            src="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Decorative"
            className="h-[38rem] w-full xl:block md:hidden sm:hidden object-cover rounded-lg"
          />
        </div>
    </section>
  );
};

export default Register;
