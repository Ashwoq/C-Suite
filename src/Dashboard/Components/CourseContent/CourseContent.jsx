import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CourseContent.css";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import Accordion from "react-bootstrap/Accordion";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
import ProgressBar from "../ProgressBar/ProgressBar";

const CourseContent = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState(null);
  const [courseData, setCourseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [currentCourseData, setCurrentCourseData] = useState({});
  // nxt btn
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);
  const [activeAccordion, setActiveAccordion] = useState(null);

  // progress
  const [completedExercises, setCompletedExercises] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://csuite-production.up.railway.app/api/courseDetail/${courseId}`
        );
        setCourseData(response.data);
        // console.log(response.data.course);

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo && userInfo.userID) {
          const { userID } = userInfo;
          setUserId(userID);
        } else {
          setFetchError(true);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
        setFetchError(true);
      }
    };

    fetchData();
  }, []);

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? null : index);
    setActiveAccordion(index === activeLesson ? null : index);
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

  // currentcourse kkaaga ethu
  const handleCurrentContent = (data, lessonIndex, excerciseIndex) => {
    //     {
    //     "title": "Change Management Essentials",
    //     "link": "#",
    //     "duration": "18:30",
    //     "notes": "This video provides an overview of change management principles and strategies to manage transitions smoothly."
    // }

    // progress bar kaaga below
    const exerciseKey = `${lessonIndex}-${excerciseIndex}`;
    setCompletedExercises((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.add(exerciseKey);
      return updatedSet;
    });

    // progress bar kaaga above

    const modifiedData = {
      ...data,
      excerciseNo: excerciseIndex + 1,
      lessonNo: lessonIndex + 1,
      link: "https://www.youtube.com/embed/9DccPRe6-I8?autoplay=1&start=15",
    };
    setCurrentCourseData(modifiedData);
    // nxt btn
    setCurrentLessonIndex(lessonIndex);
    setCurrentVideoIndex(excerciseIndex);
    setActiveAccordion(lessonIndex);
  };

  const handleNext = () => {
    if (courseData.lessons) {
      const currentLesson = courseData.lessons[currentLessonIndex];

      if (currentLessonIndex === 0 && currentVideoIndex === -1) {
        handleCurrentContent(currentLesson.videos[0], currentLessonIndex, 0);
      } else if (currentVideoIndex < currentLesson.videos.length - 1) {
        handleCurrentContent(
          currentLesson.videos[currentVideoIndex + 1],
          currentLessonIndex,
          currentVideoIndex + 1
        );
      } else if (currentLessonIndex < courseData.lessons.length - 1) {
        const nextLesson = courseData.lessons[currentLessonIndex + 1];
        handleCurrentContent(nextLesson.videos[0], currentLessonIndex + 1, 0);
      } else {
        const totalExercises = courseData.lessons.reduce(
          (total, lesson) => total + lesson.videos.length,
          0
        );
        if (completedExercises.size === totalExercises) {
          alert("Congratulations! You have completed the course!");
        } else {
          alert("There are few lessons you need to complete!");
        }
      }
    }
  };

  // const handleNext = () => {
  //   if (courseData.lessons) {
  //     const currentLesson = courseData.lessons[currentLessonIndex];
  //     if (currentVideoIndex < currentLesson.videos.length - 1) {
  //       handleCurrentContent(
  //         currentLesson.videos[currentVideoIndex + 1],
  //         currentLessonIndex,
  //         currentVideoIndex + 1
  //       );
  //     } else if (currentLessonIndex < courseData.lessons.length - 1) {
  //       const nextLesson = courseData.lessons[currentLessonIndex + 1];
  //       handleCurrentContent(nextLesson.videos[0], currentLessonIndex + 1, 0);
  //     } else {
  //       // Check if all exercises are completed
  //       const totalExercises = courseData.lessons.reduce(
  //         (total, lesson) => total + lesson.videos.length,
  //         0
  //       );
  //       if (completedExercises.size === totalExercises) {
  //         alert("Congratulations! You have completed the course!");
  //       } else {
  //         alert("There are few lessons you need to complete!");
  //       }
  //     }
  //   }
  // };

  // ppt format kaaga
  const renderContent = (lesson, typeManual) => {
    // if (lesson.type === "video") {
    if (typeManual === "video") {
      return (
        <iframe
          title={
            !currentCourseData.title
              ? courseData.lessons[0].title
              : currentCourseData.title
          }
          className="embed-responsive-item"
          src={
            courseData.videoUrl !== undefined && courseData.videoUrl !== ""
              ? courseData.videoUrl
              : currentCourseData.link !== undefined &&
                currentCourseData.link !== ""
              ? currentCourseData.link
              : "https://www.youtube.com/embed/9DccPRe6-I8?autoplay=1&start=15"
          }
          allow="autoplay"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      );
    } else if (typeManual === "ppt") {
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
    }
  };

  // progress bar kaaga
  const calculateProgress = () => {
    const totalExercises = courseData.lessons?.reduce(
      (total, lesson) => total + lesson.videos.length,
      0
    );
    const progress =
      totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

    return progress;
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
    <div className="courseContentContainer">
      <div className="row firstRow g-0">
        <div className="courseContentHeader">
          <button className="BackBtn" onClick={() => navigate(-1)}>
            Back
          </button>
          <div className="courseHeading">{courseData.title}</div>
          <button className="NextBtn" onClick={() => handleNext()}>
            Next
          </button>
        </div>
        <div className="courseContentProgressBar">
          <ProgressBar progress={calculateProgress()} />
        </div>{" "}
      </div>
      <div className="row secondRow">
        <div className="col-md-8 pdy">
          <div className="videoBox">
            <div className="embed-responsive embed-responsive-16by9">
              {courseData.lessons &&
                courseData.lessons.length > 0 &&
                renderContent(courseData.lessons[0], "video")}
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
          <Accordion activeKey={activeAccordion} onSelect={handleLessonClick}>
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
                      {
                        // findCourseTestData(courseData.title, lesson)?.lessons?.[
                        //   index
                        // ]?.isTestAvailable &&
                        lesson.testId && (
                          <div className="testButtonBox">
                            <div className="testButtonInr">
                              <div className="testButtonTxt">
                                Take a Test to Confirm Your Understanding
                              </div>
                              {/* <div>
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
                              </div> */}
                              <button
                                className="testButton"
                                onClick={() =>
                                  navigate(
                                    `/home/tests/${lesson.testId}/user/${userId}`
                                  )
                                }
                              >
                                Take Test
                              </button>
                            </div>
                          </div>
                        )
                      }
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
