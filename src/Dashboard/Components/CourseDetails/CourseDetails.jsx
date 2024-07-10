import "./CourseDetails.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Tabs, Tab, Accordion } from "react-bootstrap";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";
import CourseRecommendation from "../CourseRecomend/CourseRecommendation";

const CourseDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLesson, setActiveLesson] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [courseContentDetailsData, setCourseContentDetailsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://csuite-production.up.railway.app/api/courseDetail"
        );
        setCourseContentDetailsData(response.data.courses[0]);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? "" : index);
  };

  const calculateTotalDuration = (videos) => {
    let totalDuration = 0;
    videos.forEach((video) => {
      totalDuration +=
        parseInt(video.duration.split(":")[0], 10) * 60 +
        parseInt(video.duration.split(":")[1], 10);
    });
    return totalDuration;
  };

  const convertToReadableDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const resolveSVGPath = (relativePath) => {
    return require(`../Assets/SVG/${relativePath}`);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
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
      {paymentSuccess && (
        <>
          <PaymentSuccess />
        </>
      )}
      <div className="courseDetailsBox">
        <div className="row CDHeader g-0">
          <div className="CDHeaderIntroVideo">
            <div className="embed-responsive-16by9">
              <iframe
                title="title"
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/Zj6x_7i1jYY"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row CDBody g-0">
          <div className="CDLHS">
            <div className="CDvideoBox">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="title"
                  className="embed-responsive-item"
                  src={courseContentDetailsData.videoUrl}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="CDWhoIsThisFor">
              <h5>Who is this course for</h5>
              <div className="CDLightningBox">
                {courseContentDetailsData.whoIsThisFor &&
                  courseContentDetailsData.whoIsThisFor.map((item, index) => (
                    <div key={index}>
                      <div className="CDLightningTxt">
                        {item.text}
                        <img
                          className="CDLightningSVG"
                          src={resolveSVGPath(item.icon)}
                          alt={item.text}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="CDWhatYouGet">
              <h5>What you'll get out of this</h5>
              {courseContentDetailsData.whatYouGet &&
                courseContentDetailsData.whatYouGet.map((item, index) => (
                  <div className="CDWhatBoxContent" key={index}>
                    <img src={resolveSVGPath(item.icon)} alt={item.title} />
                    <div>
                      <div className="CDItemTitle">{item.title}</div>
                      <span>{item.description}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="CDMHS">
            <div className="CDtabBox">
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
                  <h4 className="">{courseContentDetailsData.title}</h4>
                  <p className="">
                    {isExpanded
                      ? courseContentDetailsData.description
                      : courseContentDetailsData.description
                      ? courseContentDetailsData.description
                          .split("\n")
                          .slice(0, 1)
                          .join(" ")
                      : ""}

                    {!isExpanded && (
                      <span
                        className="read-more-link text-primary px-1"
                        onClick={toggleDescription}
                        style={{ cursor: "pointer" }}
                      >
                        Read More
                      </span>
                    )}
                    {isExpanded && (
                      <span
                        className="read-more-link text-primary px-1"
                        style={{ cursor: "pointer" }}
                        onClick={toggleDescription}
                      >
                        Read Less
                      </span>
                    )}
                  </p>
                  <h4 className="">
                    {" "}
                    What you will gain after completion of the course
                  </h4>
                  <div
                    // style={{
                    //   display: "flex",
                    //   flexDirection: "row",
                    //   flexWrap: "wrap",
                    //   gap: "20px",
                    // }}
                    className="CDOverviewPills"
                  >
                    {courseContentDetailsData.overviewPoints &&
                      courseContentDetailsData.overviewPoints.map(
                        (point, index) => (
                          <span
                            key={index}
                            className="overview-button"
                            // style={{
                            //   backgroundColor: "#f3e6ff",
                            //   borderRadius: "20px",
                            // }}
                          >
                            {point.heading}
                          </span>
                        )
                      )}
                  </div>
                  <h4>Recommended Courses</h4>
                  <div
                    // style={{
                    //   display: "flex",
                    //   flexDirection: "row",
                    //   flexWrap: "wrap",
                    //   gap: "20px",
                    // }}
                    className="CDRmdCourse"
                  >
                    {courseContentDetailsData.recommendedCourses &&
                      courseContentDetailsData.recommendedCourses.map(
                        (course, index) => (
                          <CourseRecommendation
                            key={index}
                            title={course.title}
                            link={course.link}
                          />
                        )
                      )}
                  </div>
                </Tab>
                <Tab eventKey="lessons" title="Lessons">
                  <div className="CDAccordianBox">
                    <Accordion
                      activeKey={activeLesson}
                      onSelect={handleLessonClick}
                    >
                      {courseContentDetailsData.lessons &&
                        courseContentDetailsData.lessons.map(
                          (lesson, index) => (
                            <Accordion.Item key={index} eventKey={index}>
                              <Accordion.Header>
                                <div className="CDlesson-meta">
                                  <div className="CDlesson-title">
                                    {index + 1}. {lesson.title}
                                  </div>
                                  <span className="CDlesson-duration">
                                    Duration:{" "}
                                    {convertToReadableDuration(
                                      calculateTotalDuration(lesson.videos)
                                    )}
                                  </span>
                                  <span className="">
                                    &nbsp;/&nbsp; Total Videos:{" "}
                                    {lesson.videos.length}
                                  </span>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="CDAccodrionBody">
                                  <ul className="list-group">
                                    {lesson.videos.map((video, vidIndex) => (
                                      <li
                                        key={vidIndex}
                                        className="list-group-item"
                                      >
                                        <span className="video-number">
                                          <a href={video.link}>
                                            {`${index + 1}.${vidIndex + 1}`}{" "}
                                            {video.title}
                                          </a>
                                        </span>
                                        <span className="CDlesson-duration">
                                          Duration: {video.duration}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          )
                        )}
                    </Accordion>
                  </div>
                </Tab>
                <Tab
                  eventKey="overview"
                  title="Overview"
                  className="CDtabBoxOverV"
                >
                  {courseContentDetailsData.overviewPoints &&
                    courseContentDetailsData.overviewPoints.map(
                      (point, index) => (
                        <div key={index}>
                          <h5>{point.heading}</h5>
                          <p>{point.content}</p>
                        </div>
                      )
                    )}
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="CDRHS">
            <div className="CDPriceBox">
              <h3>₹ {courseContentDetailsData.price}</h3>
              <div className="CDOffer">
                <div className="CDStrike">
                  ₹ {courseContentDetailsData.price * 2}
                </div>
                <span>50%</span>
              </div>
              <button className="CDCartBtn">Add to Cart</button>
              <button
                onClick={() => setPaymentSuccess(true)}
                className="CDBuyBtn"
              >
                Buy Now
              </button>
            </div>
            <div className="CDCourseDetails">
              <h4>Course Details</h4>
              <div>
                {courseContentDetailsData.courseDetails &&
                  courseContentDetailsData.courseDetails.map(
                    (detail, index) => (
                      <div key={index} className="CDCourseDetailRow">
                        <span className="detailIcon">{detail.icon}</span>
                        {detail.text}
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
