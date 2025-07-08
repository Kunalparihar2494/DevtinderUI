import React, { useState } from "react";
import Userfeed from "./Userfeed";
import Loading from "./Loading";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = (props) => {
  const [firstName, setFirstName] = useState(props?.userInfo?.firstName);
  const [lastName, setLastName] = useState(props?.userInfo?.lastName);
  const [age, setAge] = useState(props?.userInfo?.age || '');
  const [gender, setGender] = useState(props?.userInfo?.gender);
  const [photoURL, setPhotoURL] = useState(props?.userInfo?.photoURL);
  const [about, setAbout] = useState(props?.userInfo?.about);
  const [skills, setSkills] = useState(props?.userInfo?.skills || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  let feeds = { firstName, lastName, age, gender, photoURL, about, skills };

  const saveProfile = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoURL,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="flex justify-center my-10 mx-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 h-fit">
            <legend className="fieldset-legend">Edit Profile</legend>

            <label className="label">First Name:</label>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <label className="label">Last Name:</label>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="First Name"
            />
            <label className="label">Age:</label>
            <input
              type="text"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />
            <label className="label">Gender:</label>
            <select
              defaultValue="Pick a gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select"
            >
              <option disabled={true}>Pick a gender</option>
              <option value={"Male"}>👨 Male</option>
              <option value={"Female"}>👩‍🦰 Female</option>
              <option value={"Others"}>🏳️‍🌈 Others</option>
            </select>

            <label className="label">Photo Url:</label>
            <input
              type="text"
              className="input"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Photo Url"
            />
            <label className="label">About:</label>
            <textarea
              type="text"
              className="textarea"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About"
            />

            <label className="label">Skills:</label>
            <input
              type="text"
              className="input"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Skills"
            />
            {error && <div className="text-red-800">{error}</div>}
            {isLoading ? (
              <div className="flex justify-center mt-4">
                <Loading size="loading-xl" />
              </div>
            ) : (
              <button className="btn btn-neutral mt-4" onClick={saveProfile}>
                Save Profile
              </button>
            )}
          </fieldset>
        </div>
        <div className="my-14">
          <Userfeed feeds={feeds} />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
