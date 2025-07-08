import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const Userfeed = ({ feeds }) => {
  const dispatch = useDispatch();

  const handelSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "request/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!feeds)
    return (
      <div className="flex justify-center my-10">
        <p className="text-2xl">No user available</p>
      </div>
    );

  if (feeds.length <= 0)
    return (
      <div className="flex justify-center my-10">
        <p className="text-2xl">No user available</p>
      </div>
    );
  const { _id, firstName, lastName, age, gender, about, photoURL, skills } =
    feeds;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <div className="flex">
            <h2 className="card-title justify-start">
              {firstName + " " + lastName}
            </h2>
            {age && gender && (
              <p className="flex justify-end">{age + " " + gender}</p>
            )}
          </div>
          <div>
            <p>{about} </p>
            <p>{skills}</p>
          </div>

          <div className="card-actions justify-center mt-5">
            <button
              className="btn btn-primary mr-3"
              onClick={() => handelSendRequest("pass", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary ml-3"
              onClick={() => handelSendRequest("like", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userfeed;
