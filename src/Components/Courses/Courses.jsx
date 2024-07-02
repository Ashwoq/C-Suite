import React from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";
import coursesData from "../Assets/Data/CourseList.json";

const resolveImagePath = (relativePath) => {
  return require(`../Assets/Images/${relativePath}`);
};

const Courses = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-content">
        <div className="cardContainer3">
          <h2>Courses</h2>
          <div className="courseContainer3">
            {coursesData.map((course) => (
              <div className="courseCard3" key={course.id}>
                <div className="courseOverlay3">
                  <div className="courseImageBox3">
                    <img
                      src={resolveImagePath(course.image)}
                      alt={course.title}
                      className="courseImage3"
                    />
                    <div className="courseImageTxt3">{course.title}</div>
                  </div>
                  <div className="courseDetails3">
                    <p>{course.description}</p>
                    <button className="courseDetailBtn3">View Details</button>
                  </div>
                </div>
                <div className="courseLessonBox3">
                  <h5>Lessons</h5>
                  <ul>
                    {course.lessons.slice(0, 5).map((lesson, index) => (
                      <li key={index}>{lesson}</li>
                    ))}
                    {course.lessons.length > 5 && <li>...and more</li>}
                  </ul>
                  <button
                    onClick={() => navigate("/courseDetails")}
                    className="lessonDetailBtn3"
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
