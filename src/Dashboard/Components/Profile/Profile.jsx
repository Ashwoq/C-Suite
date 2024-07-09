import React, { useState, useEffect } from "react";
import "./Profile.css";
import profileImage from "../Assets/Images/profileImage.jpeg";
import profileBanner from "../Assets/Images/profileBanner.jpg";
import phoneSVG from "../Assets/SVG/phoneSVG.svg";
import mailSVG from "../Assets/SVG/mailSVG.svg";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    testScore: "",
    idCard: "",
    jobTitle: "",
    profilePic: profileImage,
    profileBanner: profileBanner,
    address: "",
    companyname: "",
    position: "",
    linkedIn: "",
    bio: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      address: "",
    },
  });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedProfileBanner, setSelectedProfileBanner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://csuite-production.up.railway.app/api/user")
      .then((response) => {
        const data = response.data.users[0];
        setProfileData(data);
        if (data.profilePic) {
          setProfileData((prevData) => ({
            ...prevData,
            profilePic: `data:image/jpeg;base64,${data.profilePic}`,
          }));
        }
        if (data.profileBanner) {
          setProfileData((prevData) => ({
            ...prevData,
            profileBanner: `data:image/jpeg;base64,${data.profileBanner}`,
          }));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setProfileData((prevData) => ({
        ...prevData,
        emergencyContact: {
          ...prevData.emergencyContact,
          [field]: value,
        },
      }));
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const formData = new FormData();

    for (const key in profileData) {
      if (key === "emergencyContact") {
        const emergencyContact = profileData[key];
        for (const field in emergencyContact) {
          formData.append(`emergencyContact.${field}`, emergencyContact[field]);
        }
      } else {
        formData.append(key, profileData[key]);
      }
    }
    if (selectedProfileImage) {
      formData.append("profilePic", selectedProfileImage);
    }
    if (selectedProfileBanner) {
      formData.append("profileBanner", selectedProfileBanner);
    }

    try {
      const response = await axios.put(
        `https://csuite-production.up.railway.app/api/user/${profileData._id}`,
        formData
      );

      if (response.status !== 200) {
        console.error("Error updating profile:", response.data);
      }
    } catch (error) {
      console.error("Network error updating profile:", error);
    }
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) =>
        setProfileData((prevData) => ({
          ...prevData,
          profilePic: e.target.result,
        }));
      reader.readAsDataURL(file);
    }
  };

  const handleProfileBannerChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedProfileBanner(file);
      const reader = new FileReader();
      reader.onload = (e) =>
        setProfileData((prevData) => ({
          ...prevData,
          profileBanner: e.target.result,
        }));
      reader.readAsDataURL(file);
    }
  };

  const inputClassName = (value) => {
    if (value === "" || value === null) {
      return "error-border";
    }
    return "";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profileContainer">
      <div className="profileBannerBox">
        <div className="profileBGBox">
          <img src={profileData.profileBanner} alt="" />
          {isEditing && (
            <label className="custom-file-upload imageBanner">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileBannerChange}
                className="imageBannerUpload"
              />
              Choose File for Profile Banner
            </label>
          )}
        </div>
        <div className="profileHeader">
          <div className="profileImage">
            <img src={profileData.profilePic} alt="Profile" className="" />
            {isEditing && (
              <label className="custom-file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="imageUpload"
                />
                Choose File
              </label>
            )}
          </div>
          <div className="profileHeaderInfo">
            <h2 className="profileName">{profileData.name}</h2>
            <p className="profileEmail">{profileData.email}</p>
          </div>
          <div className="profileEditBtn">
            <button onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
      <div className="profileContent">
        <div className="profileSection">
          <h5>General Information</h5>
          <div className={`${inputClassName(profileData.name)} profileDetails`}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(profileData.jobTitle)} profileDetails`}
          >
            {" "}
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={profileData.jobTitle}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(profileData.idCard)} profileDetails`}
          >
            <label>ID Card</label>
            <input
              type="text"
              name="idCard"
              value={profileData.idCard}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(profileData.address)} profileDetails`}
          >
            <label>Address</label>
            <textarea
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.testScore
            )} profileDetails`}
          >
            <label>Test Score</label>
            <input
              type="number"
              name="testScore"
              value={profileData.testScore}
              disabled
            />
          </div>
          <div className="profileSeperator"></div>
          <h5>Contact Details</h5>
          <div
            className={`${inputClassName(
              profileData.email
            )} profileDetails profileSPLBox`}
          >
            <img src={phoneSVG} alt="phoneNumberSVG" />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.phoneNumber
            )} profileDetails profileSPLBox`}
          >
            <img src={mailSVG} alt="mailSVG" />
            <label>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="profileSection">
          <h5>Professional Details</h5>
          <div
            className={`${inputClassName(
              profileData.companyname
            )} profileDetails`}
          >
            <label>Company Name</label>
            <input
              type="text"
              name="companyname"
              value={profileData.companyname}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(profileData.position)} profileDetails`}
          >
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={profileData.position}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(profileData.linkedIn)} profileDetails`}
          >
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedIn"
              value={profileData.linkedIn}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.bio)} profileDetails`}>
            <label>Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileSeperator"></div>
          <h5>Emergency Contact</h5>
          <div
            className={`${inputClassName(
              profileData.emergencyContact.name
            )} profileDetails`}
          >
            <label>Full Name</label>
            <input
              type="text"
              name="emergencyContact.name"
              value={profileData.emergencyContact.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.emergencyContact.relationship
            )} profileDetails`}
          >
            <label>Relationship</label>
            <input
              type="text"
              name="emergencyContact.relationship"
              value={profileData.emergencyContact.relationship}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.emergencyContact.phone
            )} profileDetails`}
          >
            <label>Phone Number</label>
            <input
              type="number"
              name="emergencyContact.phone"
              value={profileData.emergencyContact.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div
            className={`${inputClassName(
              profileData.emergencyContact.address
            )} profileDetails`}
          >
            <label>Address</label>
            <textarea
              name="emergencyContact.address"
              value={profileData.emergencyContact.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
