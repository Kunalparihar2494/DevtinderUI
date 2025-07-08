import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import Loading from "./Loading";

const Login = () => {
  const [emailId, setEmailId] = useState("Karzi@example.com");
  const [password, setPassword] = useState("Karzi@123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
      setError(error?.response?.data)
      console.error("Error-", error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input validator"
          required
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Email"
        />
        <div className="validator-hint">Enter valid email address</div>
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
           <div className="flex justify-center mt-4"><Loading size="loading-xl"/></div>
        ) : (
          <button className="btn btn-neutral mt-4" onClick={handleLogin}>
            Login
          </button>
        )}
      </fieldset>
    </div>
  );
};

export default Login;
