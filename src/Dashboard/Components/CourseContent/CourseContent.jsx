import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./CourseContent.css";
import { useNavigate } from "react-router-dom";
import courseData from "../Assets/Data/CourseContentDetails.json";
import testData from "../Assets/Data/TestData.json";
import PersonIcon from "../Assets/SVG/PersonIcon.svg";
import SettingsIcon from "../Assets/SVG/SettingsIcon.svg";
import LogoutIcon from "../Assets/SVG/LogoutIcon.svg";
import HomeIcon from "../Assets/SVG/HomeIcon.svg";

const CourseContent = () => {
  const navigate = useNavigate();

  const [activeLesson, setActiveLesson] = useState(null);
  const [activeLessonTab, setActiveLessonTab] = useState(null);

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? null : index);
  };

  const handleLessonClickTab = (index) => {
    setActiveLessonTab(index === activeLessonTab ? null : index);
  };

  const [activeTab, setActiveTab] = useState("description");

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

  //
  const findCourseTestData = (courseTitle) => {
    return testData.courses.find((course) => course.title === courseTitle);
  };

  return (
    <div className="courseContentContainer">
      <div className="row firstRow hideClassForXS">
        <div className="TopBar col-8 ">
          {/* 
           <button className="row firstRowBtn" onClick={() => navigate(-1)}>
            <span>&larr;</span>&nbsp;&nbsp;Back
          </button>
          <div className="row firstRowHeadingBox">
            <div className="courseHeading col-10">{courseData.title}</div>
            <button className="col-2">
              Next video &nbsp; <span>&#5171;</span>
            </button>
          </div> */}
          <div className="TopBar">
            <button className="BackBtn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="TitleBar">{courseData.title}</div>
          <div className=" TopBar">
            <button className="BackBtn">Next</button>
          </div>
        </div>
        <div className="col-4 settingTab">
          <div className="MenuBarIcons">
            <img src={HomeIcon} alt="" />
            <p>Home</p>
          </div>
          <div className="MenuBarIcons">
            <img src={PersonIcon} alt="" />
            <p>Profile</p>
          </div>
          <div className="MenuBarIcons">
            <img src={SettingsIcon} alt="" />
            <p>Settings</p>
          </div>
          <div className="MenuBarIcons">
            <img src={LogoutIcon} alt="" />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="row firstRow showClassForXS g-0">
        <div className="btnRows">
          <button className="firstRowBtn" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <button className="firstRowBtn">Next Video</button>
        </div>

        <div className="courseHeading">{courseData.title}</div>
      </div>
      <div className="row secondRow">
        <div className="col-md-8 pdy">
          <div className="videoBox">
            <div className="embed-responsive embed-responsive-16by9 mb-4">
              <iframe
                title="title"
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/Zj6x_7i1jYY"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <div className="infoBox">
                <h1 className="my-2">{courseData.title}</h1>
                <div className="lessonDescriptionBox my-3">
                  <h3 className="lessonDescriptionBoxTitle my-2">
                    1. {courseData.lessons[0].title}
                  </h3>
                  <p className="lessonDescriptionBoxDescription">
                    {courseData.lessons[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="CDtabBox CCbgColor">
            <Tabs
              id="course-content-tabs"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
            >
              <Tab
                eventKey="description"
                title="Description"
                className="CDtabBoxDesc"
              >
                <p>{courseData.description}</p>
              </Tab>
              <Tab eventKey="lessons" title="Lessons">
                <div className="CDAccordianBox">
                  <Accordion
                    activeKey={activeLessonTab}
                    onSelect={handleLessonClickTab}
                  >
                    {courseData.lessons.map((lesson, index) => (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                          <div className="CDlesson-meta">
                            <div className="CDlesson-title">
                              {index + 1}. {lesson.title}
                            </div>
                            <span className="CDlesson-duration">
                              Duration: {calculateTotalDuration(lesson.videos)}
                            </span>
                            <span className="">
                              &nbsp;/&nbsp; Total Videos: {lesson.videos.length}
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
                                      {`${index + 1}.${vidIndex + 1}`}{" "}
                                      {video.title}
                                    </a>
                                  </span>
                                  <span className="lesson-duration">
                                    Duration: {video.duration}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {findCourseTestData(courseData.title)?.lessons[
                              index
                            ]?.isTestAvailable && (
                              <div className="testButtonBox">
                                Take a Test to Confirm Your Understanding{" "}
                                <div>
                                  <div>
                                    <span>
                                      Total questions:{" "}
                                      {
                                        findCourseTestData(courseData.title)
                                          ?.lessons[index]?.questions.length
                                      }
                                    </span>
                                    <span>
                                      Time Limit:{" "}
                                      {findCourseTestData(courseData.title)
                                        ?.lessons[index]?.timeLimit ??
                                        "Not specified"}
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
              </Tab>
              <Tab
                eventKey="overview"
                title="Overview"
                className="CDtabBoxOverV"
              >
                {courseData.overviewPoints.map((point, index) => (
                  <div key={index}>
                    <h5>{point.heading}</h5>
                    <p>{point.content}</p>
                  </div>
                ))}{" "}
              </Tab>
            </Tabs>
          </div> */}
        </div>
        <div className="col-md-4  accordianBox">
          <Accordion
            activeKey={activeLesson}
            onSelect={handleLessonClick}
            alwaysOpen
          >
            {courseData.lessons.map((lesson, index) => (
              <div key={index} className="accordion-item">
                <Accordion.Item eventKey={index}>
                  <Accordion.Header onClick={() => handleLessonClick(index)}>
                    <div className="lesson-meta">
                      <div className="lesson-title">
                        {index + 1}&nbsp;.&nbsp;
                        {lesson.title}
                      </div>
                      <span className="lesson-duration">
                        Duration : {calculateTotalDuration(lesson.videos)}
                      </span>
                      <span className="">
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
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
