import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

import TopBar from "../TopBar/TopBar";
import Header from "../Header/Header";
import CustomCalendar from "../Calendar/Calendar";
import Statistics from "../Statistics/Statistics";
import LoadingPage from "../LoadingPage/LoadingPage";
import CourseRecommendation from "../CourseRecomend/CourseRecommendation";

// import CourseList from "../CourseList/CourseList";

function Home() {
  const [courseContentDetailsData, setCourseContentDetailsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://csuite-production.up.railway.app/api/courseDetail"
        );
        setCourseContentDetailsData(response.data.courses[0]);
        setIsLoading(false);
        console.log(courseContentDetailsData);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <TopBar />
        <div className="header-part">
          <Header />
          <CustomCalendar />
        </div>
        <Statistics />
      </div>
      {/* <div className="header-container">

      </div> */}
      <h4>Recommended Courses</h4>
      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "row",
      //   flexWrap: "wrap",
      //   gap: "20px",
      // }}
      >
        {courseContentDetailsData.recommendedCourses &&
          courseContentDetailsData.recommendedCourses.map((course, index) => (
            <CourseRecommendation
              key={index}
              title={course.title}
              link={course.link}
            />
          ))}
      </div>{" "}
    </>
  );
}

export default Home;
