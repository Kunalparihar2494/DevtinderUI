import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/reqSlice";

const Request = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchReq = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/request", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReq();
  }, []);

  if (!request) return null;

  if (request.length === 0)
    return <div className=" flex justify-center my-10 text-3xl text-white font-sans">No request found</div>;

  return (
    <div className="flex justify-center my-5">
      <ul className="list bg-base-300 rounded-box shadow-md">
        {request.map((req) => {
          const { _id,firstName, lastName, age, gender, photoURL } =
            req.fromUserId;
          return (
            <li key={_id} className="list-row flex items-center justify-between md:h-30">
              <div>
                <img className="size-10 md:size-20 rounded-box" src={photoURL} />
              </div>
              <div>
                <div>
                  {firstName} {lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {age} {gender}
                </div>
              </div>
              {/* <p className="list-col-wrap text-xs">{about}</p>
              <p className="list-col-wrap text-xs">{skills}</p> */}
              <div className="">
                <button className="btn btn-soft btn-primary mx-1 md:mx-5">Reject</button>
                <button className="btn btn-soft btn-secondary">
                  Accept
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Request;
