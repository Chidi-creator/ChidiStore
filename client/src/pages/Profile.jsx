import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUpdateProfile from "../hooks/User/useUpdateProfle";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { updateProfile, isLoading, error } = useUpdateProfile();
  const { userInfo } = useAuth();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updateProfile(username, email, password);
      //   navigate(redirect);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full border"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full border"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 hover:bg-pink-700"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
          </form>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
