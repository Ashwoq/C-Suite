import React, { useState, useEffect } from "react";
import "../Courses/Courses.css";
import axios from "axios";
import imgd from "../Assets/Images/imagenotxt2.png";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
// import coursesData from "../Assets/Data/CourseList.json";

const Enrolled = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  // const [coursePurchasedTitle, setCoursePurchasedTitle] = useState(true);
  const [hasPurchasedCourses, setHasPurchasedCourses] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [allLessons, setAllLessons] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch all courses
  //       const response = await axios.get(
  //         "https://csuite-production.up.railway.app/api/courseList"
  //       );
  //       const allCourses = response.data.courses;

  //       // Fetch coursePurchasedTitle
  //       const responseUser = await axios.get(
  //         "https://csuite-production.up.railway.app/api/user"
  //       );
  //       const purchasedTitle = responseUser.data.users[0].coursePurchased;
  //       setCoursePurchasedTitle(purchasedTitle);

  //       // Filter courses based on purchased titles
  //       const filteredCourses = allCourses.filter((course) =>
  //         purchasedTitle.includes(course.title)
  //       );
  //       setCoursesData(filteredCourses);

  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [coursesResponse, userResponse] = await Promise.all([
  //         axios.get(
  //           "https://csuite-production.up.railway.app/api/courseDetail"
  //         ),
  //         axios.get("https://csuite-production.up.railway.app/api/user"),
  //       ]);

  //       const allCourses = coursesResponse.data.courses;
  //       const purchasedTitles = userResponse.data.users[2].coursePurchased;
  //       console.log(userResponse.data.users[2].coursePurchased);
  //       setCoursePurchasedTitle(purchasedTitles);

  //       const filteredCourses = allCourses.filter((course) =>
  //         purchasedTitles.includes(course._id)
  //       );
  //       console.log(
  //         filteredCourses,
  //         "fil",
  //         allCourses,
  //         "alco",
  //         purchasedTitles,
  //         "pur"
  //       );

  //       setCoursesData(filteredCourses);
  //       setIsLoading(false);
  //     } catch (error) {
  //       alert("Failed to fetch data. Please try again later.");
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get(
          "https://csuite-production.up.railway.app/api/courseDetail"
        );
        const allCourses = coursesResponse.data.courses;

        // Retrieve userInfo from localStorage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
          const { coursePurchased } = userInfo;
          // console.log(coursePurchased, "coursePurchased");

          // Set the purchased titles
          // setCoursePurchasedTitle(coursePurchased);

          // Check if there are any purchased courses
          if (coursePurchased.length === 0) {
            setHasPurchasedCourses(false);
          }

          // Filter courses based on purchased titles
          const filteredCourses = allCourses.filter((course) =>
            coursePurchased.includes(course._id)
          );
          // console.log(
          //   filteredCourses,
          //   "filteredCourses",
          //   allCourses,
          //   "allCourses",
          //   coursePurchased,
          //   "coursePurchased"
          // );

          setCoursesData(filteredCourses);
        } else {
          alert("User not logged in");
          console.log("No user info found in localStorage");
        }

        setIsLoading(false);
      } catch (error) {
        alert("Failed to fetch data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getAllLessons = () => {
      let lessons = [];
      coursesData.forEach((course) => {
        course.lessons.forEach((lesson) => {
          if (!lessons.includes(lesson.title)) {
            lessons.push(lesson.title);
          }
        });
      });

      // Shuffle the lessons array
      for (let i = lessons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lessons[i], lessons[j]] = [lessons[j], lessons[i]];
      }

      return lessons.slice(0, 10);
    };

    if (coursesData.length > 0) {
      setAllLessons(getAllLessons());
    }
  }, [coursesData]);

  const resolveImagePath = (relativePath) => {
    return require(`../Assets/Images/${relativePath}`);
  };

  const filterCourses = (filters) => {
    if (filters.length === 0) {
      return coursesData;
    } else {
      return coursesData.filter((course) =>
        course.lessons.some((lesson) => filters.includes(lesson.title))
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

  const truncateDescription = (description) => {
    const words = description.split(" ");
    const truncated = words.slice(0, 15).join(" ");
    return truncated;
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
          <h2>Enrolled Courses</h2>
          {!hasPurchasedCourses && (
            <h3>No courses have been purchased. Please purchase a course.</h3>
          )}

          <div className="filterChips">
            {allLessons.map((lesson, index) => (
              <div
                key={index}
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
              // {/* {coursesData.map((course) => ( */}
              <div className="courseCard3" key={course._id}>
                <div className="courseOverlay3">
                  <div className="courseImageBox3">
                    <img
                      // src={imgd}
                      src={course.image ? resolveImagePath(course.image) : imgd}
                      alt={course.title}
                      className="courseImage3"
                    />
                    <div className="courseImageTxt3">{course.title}</div>
                  </div>
                  <div className="courseDetails3">
                    <p>{truncateDescription(course.description)}...</p>
                    <button className="courseDetailBtn3">View Details</button>
                  </div>
                </div>
                <div className="courseLessonBox3">
                  <h5>Lessons</h5>
                  <ul>
                    {course.lessons.slice(0, 3).map((lesson, index) => (
                      <li key={index}>{lesson.title}</li>
                    ))}
                    {course.lessons.length > 3 && <li>...and more</li>}
                  </ul>
                  <button
                    onClick={() =>
                      navigate(`/home/courseDetails/${course._id}`)
                    }
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

export default Enrolled;
