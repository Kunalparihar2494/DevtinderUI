import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import Loading from "./Loading";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data);
      console.error("Error-", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
      console.error("Error-", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {isLogin ? "Login" : "Sign Up"}
        </legend>
        {!isLogin && (
          <>
            <label className="label">First Name:</label>
            <input
              type="text"
              className="input"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <label className="label">Last Name:</label>
            <input
              type="text"
              className="input"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input validator"
          required
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Email"
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <div className="text-red-700">{error}</div>}
        {isLoading ? (
          <div className="flex justify-center mt-4">
            <Loading size="loading-xl" />
          </div>
        ) : (
          <button className="btn btn-neutral mt-4" onClick={isLogin ? handleLogin : handleSignUp}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        )}
        <p
          className="text-white cursor-pointer py-5"
          onClick={() => setIsLogin((value) => !value)}
        >
          {isLogin
            ? "New User ? Sign Up Here!!"
            : "Already Signed Up ? Login Here!!!"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
