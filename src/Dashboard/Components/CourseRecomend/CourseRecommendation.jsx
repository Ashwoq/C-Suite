import React from "react";
import "./CourseRecommendation.css";
import js from "../Assets/Images/imagenotxt.png";

const CourseRecommendation = ({ title, link }) => {
  return (
    <div className="cr-card">
      <div className="cr-image-container">
        <img src={js} className="cr-image" alt="thumbnail" />
        <div className="cr-title">{title}</div>
      </div>
      <div className="cr-button">View Course</div>
    </div>
  );
};

export default CourseRecommendation;
