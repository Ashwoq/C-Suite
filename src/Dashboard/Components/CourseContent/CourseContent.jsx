import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CourseContent.css";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import Accordion from "react-bootstrap/Accordion";
import testData from "../Assets/Data/TestData.json";
// import courseData from "../Assets/Data/CourseContentDetails.json";

const CourseContent = () => {
  const navigate = useNavigate();

  const [activeLesson, setActiveLesson] = useState(null);
  const [courseData, setCourseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://csuite-production.up.railway.app/api/courseDetail"
        );
        setCourseData(response.data.courses[0]);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? null : index);
  };

  const calculateTotalDuration = (videos) => {
    let totalSeconds = 0;
    videos.forEach((video) => {
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

  const findCourseTestData = (courseTitle) => {
    return testData.courses.find((course) => course.title === courseTitle);
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
                title="title"
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/Zj6x_7i1jYY"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <div className="infoBox">
                <h1>{courseData.title}</h1>
                {courseData.lessons && courseData.lessons.length > 0 && (
                  <div className="lessonDescriptionBox">
                    <h3 className="lessonDescriptionBoxTitle">
                      1. {courseData.lessons[0].title}
                    </h3>
                    <p className="lessonDescriptionBoxDescription">
                      {courseData.lessons[0].description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 CCaccordianBox">
          <Accordion activeKey={activeLesson} onSelect={handleLessonClick}>
            {courseData.lessons &&
              courseData.lessons.map((lesson, index) => (
                <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header onClick={() => handleLessonClick(index)}>
                    <div className="lesson-meta">
                      <div className="lesson-title">
                        {index + 1}&nbsp;.&nbsp;{lesson.title}
                      </div>
                      <span className="lesson-duration">
                        Duration : {calculateTotalDuration(lesson.videos)}
                      </span>
                      <span>
                        &nbsp; /&nbsp; Total Videos : {lesson.videos.length}
                      </span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <ul className="list-group">
                        {lesson.videos.map((video, vidIndex) => (
                          <li key={vidIndex} className="list-group-item">
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
                      {findCourseTestData(courseData.title)?.lessons[index]
                        ?.isTestAvailable && (
                        <div className="testButtonBox">
                          Take a Test to Confirm Your Understanding{" "}
                          <div>
                            <div>
                              <span>
                                Total questions:{" "}
                                {
                                  findCourseTestData(courseData.title)?.lessons[
                                    index
                                  ]?.questions.length
                                }
                              </span>
                              <span>
                                Time Limit:{" "}
                                {findCourseTestData(courseData.title)?.lessons[
                                  index
                                ]?.timeLimit ?? "Not specified"}
                              </span>
                            </div>
                            <button
                              className="testButton"
                              onClick={() =>
                                navigate(`/home/test/${index + 1}`)
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
