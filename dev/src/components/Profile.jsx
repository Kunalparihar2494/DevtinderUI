import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });
      setUserInfo(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
     fetchUser();
  },[])

  return (
    <div>
      {userInfo && <EditProfile userInfo={userInfo} /> }
    </div>
  );
};

export default Profile;
