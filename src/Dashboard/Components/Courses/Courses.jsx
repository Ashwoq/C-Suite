// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Courses.css";
// import { useNavigate } from "react-router-dom";
// import LoadingPage from "../LoadingPage/LoadingPage";
// import imgd from "../Assets/Images/imagenotxt2.png";
// import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";

// const Courses = () => {
//   const navigate = useNavigate();
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [coursesData, setCoursesData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [allLessons, setAllLessons] = useState([]);
//   const [fetchError, setFetchError] = useState(false);

//   //
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://csuite-production.up.railway.app/api/courseDetail/"
//         );
//         setCoursesData(response.data);
//         // console.log(response.data, "lst");
//         setIsLoading(false);
//         setFetchError(false);
//       } catch (err) {
//         console.log(err);
//         setIsLoading(false);
//         setFetchError(true);
//       }
//     };
//     fetchData();
//   }, []);

//   const resolveImagePath = (imagePath) => {
//     if (
//       imagePath &&
//       (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
//     ) {
//       return imagePath;
//     } else if (imagePath && imagePath.startsWith("base64")) {
//       return imgd;
//     } else {
//       return require(`../Assets/Images/${imagePath}`);
//     }
//   };

//   // useEffect(() => {
//   //   const getAllLessons = () => {
//   //     let lessons = [];
//   //     coursesData.forEach((course) => {
//   //       course.lessons.forEach((lesson) => {
//   //         if (!lessons.includes(lesson.title)) {
//   //           lessons.push(lesson.title);
//   //         }
//   //       });
//   //     });

//   //     // Shuffle the lessons array
//   //     for (let i = lessons.length - 1; i > 0; i--) {
//   //       const j = Math.floor(Math.random() * (i + 1));
//   //       [lessons[i], lessons[j]] = [lessons[j], lessons[i]];
//   //     }

//   //     return lessons.slice(0, 10);
//   //   };

//   //   if (coursesData?.length > 0) {
//   //     setAllLessons(getAllLessons());
//   //   }
//   // }, [coursesData]);

//   useEffect(() => {
//     const getAllLessons = () => {
//       let lessons = [];
//       try {
//         coursesData.forEach((course) => {
//           course.lessons.forEach((lesson) => {
//             if (!lessons.includes(lesson.title)) {
//               lessons.push(lesson.title);
//             }
//           });
//         });

//         // Shuffle the lessons array
//         for (let i = lessons.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [lessons[i], lessons[j]] = [lessons[j], lessons[i]];
//         }
//         setFetchError(false);
//       } catch (err) {
//         console.log(err);
//         setFetchError(true);
//       }
//       return lessons.slice(0, 10);
//     };

//     if (coursesData?.length > 0) {
//       setAllLessons(getAllLessons());
//     }
//   }, [coursesData]);

//   // const filterCourses = (filters) => {
//   //   if (filters.length === 0) {
//   //     return coursesData;
//   //   } else {
//   //     return coursesData.filter((course) =>
//   //       course.lessons.some((lesson) => filters.includes(lesson.title))
//   //     );
//   //   }
//   // };

//   const filterCourses = (filters) => {
//     try {
//       if (filters.length === 0) {
//         setFetchError(false); // Reset fetchError to false
//         return coursesData;
//       } else {
//         const filteredCourses = coursesData.filter((course) =>
//           course.lessons.some((lesson) => filters.includes(lesson.title))
//         );
//         setFetchError(false); // Reset fetchError to false
//         return filteredCourses;
//       }
//     } catch (err) {
//       console.log(err);
//       setFetchError(true); // Set fetchError to true if there's an error
//       return []; // Return an empty array if there's an error
//     }
//   };

//   const handleFilterClick = (filter) => {
//     if (selectedFilters.includes(filter)) {
//       setSelectedFilters(selectedFilters.filter((f) => f !== filter));
//     } else {
//       setSelectedFilters([...selectedFilters, filter]);
//     }
//   };

//   const clearFilters = () => {
//     setSelectedFilters([]);
//   };

//   const truncateDescription = (description) => {
//     const words = description.split(" ");
//     const truncated = words.slice(0, 15).join(" ");
//     return truncated;
//   };

//   if (isLoading) {
//     return (
//       <div>
//         <LoadingPage />
//       </div>
//     );
//   }

//   if (fetchError) {
//     return <ErrorDataFetchOverlay />;
//   }

//   return (
//     <>
//       <div className="main-content">
//         <div className="cardContainer3">
//           <h2>Courses</h2>
//           <div className="filterChips">
//             {allLessons.map((lesson, index) => (
//               <div
//                 key={index}
//                 className={`filterChip ${
//                   selectedFilters.includes(lesson) ? "active" : ""
//                 }`}
//                 onClick={() => handleFilterClick(lesson)}
//               >
//                 {lesson}
//               </div>
//             ))}
//             {selectedFilters.length > 0 && (
//               <button className="clearFilters" onClick={clearFilters}>
//                 Clear All
//               </button>
//             )}
//           </div>
//           <div className="courseContainer3">
//             {filterCourses(selectedFilters)?.map((course) => (
//               // {/* {coursesData.map((course) => ( */}
//               <div className="courseCard3" key={course._id}>
//                 <div className="courseOverlay3">
//                   <div className="courseImageBox3">
//                     <img
//                       // src={imgd}
//                       src={course.image ? resolveImagePath(course.image) : imgd}
//                       alt={course.title}
//                       className="courseImage3"
//                     />
//                     <div className="courseImageTxt3">{course.title}</div>
//                   </div>
//                   <div className="courseDetails3">
//                     <p>{truncateDescription(course.description)}...</p>
//                     <button className="courseDetailBtn3">View Details</button>
//                   </div>
//                 </div>
//                 <div className="courseLessonBox3">
//                   <h5>Lessons</h5>
//                   <ul>
//                     {course.lessons.slice(0, 3).map((lesson, index) => (
//                       <li key={index}>{lesson.title}</li>
//                     ))}
//                     {course.lessons.length > 3 && <li>...and more</li>}
//                   </ul>
//                   <button
//                     onClick={() =>
//                       navigate(`/home/courseDetails/${course._id}`)
//                     }
//                     className="lessonDetailBtn3"
//                   >
//                     View Course
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Courses;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Courses.css";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import imgd from "../Assets/Images/imagenotxt2.png";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";

const Courses = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allLessons, setAllLessons] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://csuite-production.up.railway.app/api/courseDetail/"
        );
        setCoursesData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setFetchError(true);
      }
    };
    fetchData();
  }, []);

  const resolveImagePath = (imagePath) => {
    if (
      imagePath &&
      (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    ) {
      return imagePath;
    } else if (imagePath && imagePath.startsWith("base64")) {
      return imgd;
    } else {
      try {
        return require(`../Assets/Images/${imagePath}`);
      } catch (error) {
        return imgd; // Fallback to default image
      }
    }
  };

  useEffect(() => {
    const getAllLessons = () => {
      let lessons = [];
      try {
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
      } catch (err) {
        console.log(err);
      }
      return lessons.slice(0, 10);
    };

    if (coursesData.length > 0) {
      const lessons = getAllLessons();
      setAllLessons(lessons);
    }
  }, [coursesData]);

  const filterCourses = (filters) => {
    try {
      if (filters.length === 0) {
        return coursesData;
      } else {
        return coursesData.filter((course) =>
          course.lessons.some((lesson) => filters.includes(lesson.title))
        );
      }
    } catch (err) {
      console.log(err);
      setFetchError(true); // Set fetchError to true if there's an error
      return []; // Return an empty array if there's an error
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

  if (fetchError) {
    return <ErrorDataFetchOverlay />;
  }

  return (
    <>
      <div className="main-content">
        <div className="cardContainer3">
          <h2>Courses</h2>
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
              <div className="courseCard3" key={course._id}>
                <div className="courseOverlay3">
                  <div className="courseImageBox3">
                    <img
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

export default Courses;
