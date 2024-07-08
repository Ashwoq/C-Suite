import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TestPage.css";

const TestPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLimit, setTimeLimit] = useState("");
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get(
          `https://csuite-production.up.railway.app/api/tests/${lessonId}`
        );
        // https://csuite-production.up.railway.app/api/tests
        const lessonTest = response.data;
        if (lessonTest && lessonTest.isTestAvailable) {
          setQuestions(lessonTest.questions);
          setTimeLimit(lessonTest.timeLimit);
        } else {
          // navigate(-1);
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
        // navigate(-1);
      }
    };

    fetchTestData();
  }, [lessonId, navigate]);

  useEffect(() => {
    if (submitted) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(intervalId);
            navigate("/courseContent");
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [submitted, navigate]);

  const handleOptionChange = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
    setUnansweredQuestions(
      unansweredQuestions.filter((q) => q !== questionIndex)
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const unanswered = questions
      .map((_, index) => index)
      .filter((index) => !(index in answers));

    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered);
      alert("Please answer all questions before submitting.");
    } else {
      setSubmitted(true);
    }
  };

  const getResult = (question, index) => {
    return question.correctAnswer === answers[index] ? "Correct" : "Incorrect";
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="testPage">
      <div className="testPageHeader">
        <div>
          <h3>{questions.length > 0 ? questions[0].courseTitle : "Test"}</h3>
          <h4>Lesson {lessonId}</h4>
        </div>
        <div>
          <p>Time Limit : {timeLimit}</p>
          <p>Total Questions : {questions.length}</p>
        </div>
      </div>

      <div className="testPageMainContainer">
        <div className="testPageContent">
          {submitted ? (
            <div className="testPageResultsContainer">
              <h3>Results</h3>
              {questions.map((question, index) => (
                <div key={index} className="testPageResult">
                  <p className="question">{question.question}</p>
                  <div className="answerResult">
                    <p>Your answer: {answers[index]}</p>
                    <p>Result: {getResult(question, index)}</p>
                    <p>Correct answer: {question.correctAnswer}</p>
                  </div>
                </div>
              ))}
              <div className="countdown">
                Redirecting in {countdown} seconds...
              </div>
            </div>
          ) : (
            <>
              <div className="testPageSidebar">
                <ul>
                  {questions.map((_, index) => (
                    <li
                      key={index}
                      className={`testPageSidebarItem ${
                        index === currentQuestionIndex ? "selected" : ""
                      }`}
                      onClick={() => handleQuestionSelect(index)}
                    >
                      {index + 1}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="testPageQuestionBox">
                <div className="testPageTotalQuestion">
                  Question No : {currentQuestionIndex + 1} / {questions.length}
                </div>
                <div className="testPageSpan">
                  <h4>Multi Choice Type Question</h4>
                  <p>{questions[currentQuestionIndex].question}</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="testPageRHS">
                <div className="testPageQuestionContainer">
                  <div className="testPageTotalQuestion testAnswerHere">
                    Answer here
                  </div>
                  {questions[currentQuestionIndex].options.map(
                    (option, optIndex) => (
                      <label key={optIndex} className="testPageOptionLabel">
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          checked={answers[currentQuestionIndex] === option}
                          onChange={() =>
                            handleOptionChange(currentQuestionIndex, option)
                          }
                        />
                        {option}
                      </label>
                    )
                  )}
                </div>
                <div className="testPageNavigationButtons">
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      className="testPageNextButton"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="testPageSubmitButton">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
