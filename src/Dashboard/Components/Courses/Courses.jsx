import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Courses.css";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
// import coursesData from "../Assets/Data/CourseList.json";

const Courses = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://csuite-production.up.railway.app/api/courseList"
        );
        setCoursesData(response.data.courses);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const resolveImagePath = (relativePath) => {
    return require(`../Assets/Images/${relativePath}`);
  };

  //
  const getAllLessons = () => {
    let lessons = [];
    coursesData.forEach((course) => {
      course.lessons.forEach((lesson) => {
        if (!lessons.includes(lesson)) {
          lessons.push(lesson);
        }
      });
    });
    return lessons.slice(0, 15);
  };

  const allLessons = getAllLessons();

  const filterCourses = (filters) => {
    if (filters.length === 0) {
      return coursesData;
    } else {
      return coursesData.filter((course) =>
        course.lessons.some((lesson) => filters.includes(lesson))
      );
    }
  };

  const handleFilterClick = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <>
      <div className="main-content">
        <div className="cardContainer3">
          <h2>Courses</h2>
          <div className="filterChips">
            {allLessons.map((lesson) => (
              <div
                key={lesson}
                className={`filterChip ${
                  selectedFilters.includes(lesson) ? "active" : ""
                }`}
                onClick={() => handleFilterClick(lesson)}
              >
                {lesson}
              </div>
            ))}
            {selectedFilters.length > 0 && (
              <button className="clearFilters" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>
          <div className="courseContainer3">
            {filterCourses(selectedFilters).map((course) => (
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
                    {course.lessons.slice(0, 3).map((lesson, index) => (
                      <li key={index}>{lesson}</li>
                    ))}
                    {course.lessons.length > 3 && <li>...and more</li>}
                  </ul>
                  <button
                    onClick={() => navigate("/home/courseDetails")}
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
