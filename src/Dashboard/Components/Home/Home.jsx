import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

import TopBar from "../TopBar/TopBar";
import Header from "../Header/Header";
import CustomCalendar from "../Calendar/Calendar";
import Statistics from "../Statistics/Statistics";
import LoadingPage from "../LoadingPage/LoadingPage";
import CourseRecommendation from "../CourseRecomend/CourseRecommendation";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://csuite-production.up.railway.app/api/courseDetail"
        );
        const courses = response.data.courses;
        setRecommendedCourses(courses);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  // Shuffle recommended courses
  const shuffledCourses = [...recommendedCourses].sort(
    () => 0.5 - Math.random()
  );

  return (
    <>
      <div className="main-content">
        <TopBar />
        <div className="header-part">
          <Header />
          <CustomCalendar />
        </div>
        <Statistics />
      </div>
      <div className="home-courseBox">
        <h4>Recommended Courses</h4>
        <div className="home-course">
          {shuffledCourses.slice(0, 5).map((course, index) => (
            <CourseRecommendation
              key={index}
              title={course.title}
              courseId={course._id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
