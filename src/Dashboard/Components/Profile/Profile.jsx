import React, { useState, useEffect } from "react";
import "./Profile.css";
import profileImage from "../Assets/Images/profileImage.jpeg";
import profileBanner from "../Assets/Images/profileBanner.jpg";
// import profileVector from "../Assets/Images/profileVector.png";
import phoneSVG from "../Assets/SVG/phoneSVG.svg";
import mailSVG from "../Assets/SVG/mailSVG.svg";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    testScore: "89",
    idCard: "20393-37373",
    jobTitle: "CEO",
    profileImage: profileImage,
    profileBanner: profileBanner,
    address: "123 Main St, Anytown, USA",
    companyName: "Tech Solutions Inc.",
    designation: "Chief Executive Officer",
    linkedIn: "https://linkedin.com/in/johndoe",
    bio: "Experienced leader in the tech industry with over 20 years of experience.",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "0987654321",
      address: "123 Main St, Anytown, USA",
    },
  });

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

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setProfileData((prevData) => ({
          ...prevData,
          profileImage: e.target.result,
        }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfileBannerChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setProfileData((prevData) => ({
          ...prevData,
          profileBanner: e.target.result,
        }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
            <img src={profileData.profileImage} alt="Profile" className="" />
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
          <div className="profileDetails">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={profileData.jobTitle}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
            <label>ID Card</label>
            <input
              type="text"
              name="idCard"
              value={profileData.idCard}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
            <label>Address</label>
            <textarea
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
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
          <div className="profileDetails profileSPLBox">
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
          <div className="profileDetails profileSPLBox">
            <img src={mailSVG} alt="mailSVG" />
            <label>Phone Number</label>
            <input
              type="number"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="profileSection">
          <h5>Professional Details</h5>
          <div className="profileDetails">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={profileData.companyName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={profileData.designation}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedIn"
              value={profileData.linkedIn}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
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
          <div className="profileDetails">
            <label>Full Name</label>
            <input
              type="text"
              name="emergencyContact.name"
              value={profileData.emergencyContact.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
            <label>Relationship</label>
            <input
              type="text"
              name="emergencyContact.relationship"
              value={profileData.emergencyContact.relationship}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
            <label>Phone Number</label>
            <input
              type="number"
              name="emergencyContact.phone"
              value={profileData.emergencyContact.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profileDetails">
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
