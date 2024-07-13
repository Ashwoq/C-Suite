import "./CourseRecommendation.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import js from "../Assets/Images/imagenotxt.png";

const CourseRecommendation = ({ title, courseId }) => {
  useEffect(() => {}, [courseId]);

  const navigate = useNavigate();
  return (
    <div className="cr-card">
      <div className="cr-image-container">
        <img src={js} className="cr-image" alt="thumbnail" />
        <div className="cr-title">{title}</div>
      </div>
      <button
        className="cr-button"
        onClick={() => navigate(`/home/courseDetails/${courseId}`)}
      >
        View Course
      </button>
    </div>
  );
};

export default CourseRecommendation;
