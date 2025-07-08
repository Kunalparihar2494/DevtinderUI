import React, { useEffect } from "react";
import Userfeed from "./Userfeed";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feeds = useSelector((store) => store.feeds);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
     fetchFeed();
  }, []);

  return (
    <div className="flex justify-center my-10">
     {feeds && <Userfeed feeds={feeds[0]}/>} 
    </div>
  );
};

export default Feed;
