import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-md">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          🧑‍💻DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <p className="flex items-center">Welcome {user.firstName}</p>
          {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-5"
            >
              <div className="w-10 rounded-full">
                <img alt="user image" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"profile"} className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <Link to={"connection"}>Connection</Link>
              </li>
              <li>
                <Link to={"request"}>Request</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
