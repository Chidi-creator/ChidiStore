import { useState, useEffect } from "react";
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaGalacticSenate,
} from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import useGetUsers from "../../hooks/Admin/useGetUsers";
import useUpdateUserProfile from "../../hooks/Admin/useUpdateUserProfle";
import Message from "../../components/Message";
import axios from "../../api/axios";

const UserList = () => {
  const {
    isLoading: isFetching,
    fetchUsers,
    users,
    error: fetchError,
    deleteUsers,
    editArray
  } = useGetUsers();
  const {
    editProfile,
    error: updateError,
    isLoading: isUpdating,
  } = useUpdateUserProfile();

  const [editableUserId, setEditableuserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const HandleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUsers(id);
      } catch (err) {
        toast.error(fetchError || "Something went wrong");
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableuserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await editProfile(editableUserName, editableUserEmail, id);
      editArray(editableUserName, editableUserEmail, id)
      setEditableuserId(null)
    } catch (err) {
      toast.error(updateError || "Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4"> Users</h1>
      {isFetching ? (
        <Loader />
      ) : fetchError ? (
        <Message variant={"danger"}>{fetchError}</Message>
      ) : (
        <div className=" flex flex-col md:flex-row">
          {/* Admin Menu */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          name=""
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          className="ml-2 bg-blue-500 text-white  rounded-lg py-4 px-4"
                          onClick={() => updateHandler(user._id)}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          w-full
                          p-2
                          border
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white  rounded-lg py-4 px-4"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => HandleDelete(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
