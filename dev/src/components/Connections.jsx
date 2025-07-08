import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connection", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connection)
    return (
      <div className=" flex justify-center my-10 text-3xl text-white font-sans">
        No connection found
      </div>
    );

  if (connection.length === 0)
    return (
      <div className=" flex justify-center my-10 text-3xl text-white font-sans">
        No connection found
      </div>
    );

  return (
    <div className="flex justify-center my-5">
      <ul className="list bg-base-300 rounded-box shadow-md">
        {connection.map((req) => {
          const { _id, firstName, lastName, age, gender, photoURL } = req;
          return (
            <li
              key={_id}
              className="list-row flex items-center justify-between md:h-30"
            >
              <div>
                <img
                  className="size-10 md:size-20 rounded-box"
                  src={photoURL}
                />
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
                <button className="btn btn-soft btn-primary mx-1 md:mx-5">
                  Block User
                </button>
                {/* <button className="btn btn-soft btn-secondary">Accept</button> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
