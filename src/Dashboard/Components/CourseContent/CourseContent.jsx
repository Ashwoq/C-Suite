import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CourseContent.css";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import Accordion from "react-bootstrap/Accordion";
// import testData from "../Assets/Data/TestData.json";
// import courseData from "../Assets/Data/CourseContentDetails.json";

const CourseContent = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [activeLesson, setActiveLesson] = useState(null);
  const [courseData, setCourseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [testData, setTestData] = useState([]);

  // ethu antha lesson ah click panna change aara function ku
  const [currentCourseData, setCurrentCourseData] = useState({});

  // ethu test page ku change pananum
  // const [currentCourseTitle, setCurrentCourseTitle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://csuite-production.up.railway.app/api/courseDetail/${courseId}`
        );
        setCourseData(response.data.course);
        // console.log(response.data.course);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // ethu test page ku
  // useEffect(() => {
  //   setCurrentCourseTitle(courseData?.title);
  // }, [courseData]);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get(
          "https://csuite-production.up.railway.app/api/tests/"
        );
        setTestData(response.data[0].courses);
      } catch (err) {
        console.error("Error fetching test data:", err);
      }
    };

    fetchTestData();
  }, []);

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? null : index);
  };

  const calculateTotalDuration = (videos) => {
    let totalSeconds = 0;
    videos?.forEach((video) => {
      const timeComponents = video.duration.split(":").map(Number);
      totalSeconds += timeComponents[0] * 60 + timeComponents[1];
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
  };

  function convertToReadableDuration(duration) {
    const [minutes, seconds] = duration.split(":");
    return `${parseInt(minutes, 10)}m ${parseInt(seconds, 10)}s`;
  }

  // test course
  // const findCourseTestData = (courseTitle) => {
  //   return testData.courses.find((course) => course.title === courseTitle);
  // };
  const findCourseTestData = (courseTitle) => {
    // console.log(
    //   testData?.find((course) => course.title === courseTitle).lessons[0]
    //     ?.isTestAvailable
    // );
    return testData?.find((course) => course.title === courseTitle) ?? {};
  };

  // currentcourse kku ethu
  const handleCurrentContent = (data, lessonIndex, excerciseIndex) => {
    //     {
    //     "title": "Change Management Essentials",
    //     "link": "#",
    //     "duration": "18:30",
    //     "notes": "This video provides an overview of change management principles and strategies to manage transitions smoothly."
    // }
    const modifiedData = {
      ...data,
      excerciseNo: excerciseIndex + 1,
      lessonNo: lessonIndex + 1,
      link: "https://www.youtube.com/embed/9DccPRe6-I8?autoplay=1&start=15",
    };
    setCurrentCourseData(modifiedData);
  };

  // ppt format ku
  const renderContent = (lesson) => {
    // if (lesson.type === "video") {
    //   return (
    //     <iframe
    //       title="Video"
    //       className="embed-responsive-item"
    //       src={lesson.link}
    //       allowFullScreen
    //     ></iframe>
    //   );
    // }
    // else if (lesson.type === "ppt") {
    // const fileId = lesson.link.split("/d/")[1].split("/")[0];
    const fileId =
      "https://drive.google.com/file/d/11LZ9bwWvJMaOfTe-AMFLcbsjQeehXJbc/view"
        .split("/d/")[1]
        .split("/")[0];
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    return (
      <iframe
        title="PPT"
        className="embed-responsive-item"
        src={embedUrl}
        allowFullScreen
      ></iframe>
    );
    // }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="courseContentContainer">
      <div className="row firstRow g-0">
        <button className="BackBtn" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="courseHeading">{courseData.title}</div>
        <button className="NextBtn">Next</button>
      </div>
      <div className="row secondRow">
        <div className="col-md-8 pdy">
          <div className="videoBox">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                title={
                  !currentCourseData.title
                    ? courseData.lessons[0].title
                    : currentCourseData.title
                }
                className="embed-responsive-item"
                src={
                  !currentCourseData.link
                    ? courseData.videoUrl
                    : currentCourseData.link
                }
                allow="autoplay"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              {/* {courseData.lessons &&
                courseData.lessons.length > 0 &&
                renderContent(courseData.lessons[0])} */}
            </div>
            <div>
              <div className="infoBox">
                <h1>{courseData.title}</h1>
                {courseData.lessons && courseData.lessons.length > 0 && (
                  <div className="lessonDescriptionBox">
                    <h3 className="lessonDescriptionBoxTitle">
                      {!currentCourseData.title
                        ? ""
                        : `${currentCourseData.lessonNo}.${currentCourseData.excerciseNo}`}{" "}
                      {!currentCourseData.title
                        ? courseData.lessons[0].title
                        : currentCourseData.title}
                      {/* {courseData.lessons[0].title} */}
                    </h3>
                    <p className="lessonDescriptionBoxDescription">
                      {!currentCourseData.notes
                        ? courseData.lessons[0].description
                        : currentCourseData.notes}
                      {/* {courseData.lessons[0].description} */}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 CCaccordianBox">
          <Accordion activeKey={activeLesson} onSelect={handleLessonClick}>
            {courseData?.lessons &&
              courseData.lessons?.map((lesson, index) => (
                <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header
                    onClick={() => handleLessonClick(index)}
                    className={
                      !currentCourseData.title
                        ? ""
                        : `${
                            currentCourseData.lessonNo === index + 1
                              ? "accr-btn-active"
                              : ""
                          }`
                    }
                    //  {!currentCourseData.title
                    //     ? ""
                    //     : `${currentCourseData.lessonNo}.${currentCourseData.excerciseNo}`}
                  >
                    <div className="lesson-meta">
                      <div className="lesson-title">
                        {index + 1}&nbsp;.&nbsp;{lesson.title}
                      </div>
                      <span className="lesson-duration">
                        Duration : {calculateTotalDuration(lesson?.videos)}
                      </span>
                      <span>
                        &nbsp; /&nbsp; Total Videos : {lesson.videos?.length}
                      </span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <ul className="list-group">
                        {lesson.videos?.map((video, vidIndex) => (
                          <li
                            key={vidIndex}
                            className={`list-group-item ${
                              currentCourseData.title === video.title
                                ? "list-group-item-active"
                                : ""
                            }`}
                            onClick={() =>
                              handleCurrentContent(video, index, vidIndex)
                            }
                          >
                            <span className="video-number">
                              <a href={video.link}>
                                {`${index + 1}.${vidIndex + 1}`}&nbsp;
                                {video.title}
                              </a>
                            </span>
                            <span className="lesson-duration">
                              Duration :{" "}
                              {convertToReadableDuration(video.duration)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {findCourseTestData(courseData.title)?.lessons?.[index]
                        ?.isTestAvailable && (
                        <div className="testButtonBox">
                          Take a Test to Confirm Your Understanding{" "}
                          <div>
                            <div>
                              <span>
                                Total questions:{" "}
                                {
                                  findCourseTestData(courseData.title)
                                    ?.lessons?.[index]?.questions.length
                                }
                              </span>
                              <span>
                                Time Limit:{" "}
                                {findCourseTestData(courseData.title)
                                  ?.lessons?.[index]?.timeLimit ??
                                  "Not specified"}
                              </span>
                            </div>
                            {/* <button
                              className="testButton"
                              onClick={() =>
                                // navigate(`/home/test/${index + 1}`)
                                // navigate(`/home/test/${index + 1}`, {
                                //   state: courseData?.title,
                                // })
                                navigate(`/home/test/${index + 1}`, {
                                  state: { courseTitle: courseData?.title },
                                })
                              }
                            >
                              Take Test
                            </button> */}
                            <button
                              className="testButton"
                              // onClick={() =>
                              //   navigate(`/home/test/${index + 1}`, {
                              //     state: { courseTitle: currentCourseTitle },
                              //   })
                              // }
                              onClick={() =>
                                navigate(
                                  `/home/test/${courseData.title}/${courseId}/${
                                    index + 1
                                  }`
                                )
                              }
                            >
                              Take Test
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
