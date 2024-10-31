import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/User/useLogin";
import Loader from "../components/Loader";

const Login = () => {
  const { userInfo } = useAuth();
  const { loginUser, error, isLoading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        {/* Form Section */}
        <div className="mr-[2rem] mt-[5rem] flex-[0.6]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={handleSubmit} className="w-[30rem]">
            <div className="my-[1.5rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 p-1 border rounded w-full text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-[1.5rem]">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 p-1 border rounded w-full text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-3 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
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
    </div>
  );
};

export default Login;
