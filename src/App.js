import "./App.css";

//Bootstrap imported
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

//react-router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Landingpage
import Landingpage from "./Components/Landingpage/Landingpage";
import Management from "./Components/Managements/Management";
import Brands from "./Components/Brands/Brands";
import Footer from "./Components/Footer/Footer";
import ContactUs from "./Components/ContactUs/ContactUs";
import FindPricing from "./Components/FindPricing/FindPricing";
import Partners from "./Components/Partners/Partners";
import Success from "./Components/Success/Success";
import Engage from "./Components/Engage/Engage";
// import Overlaycards from './Components/Overlaycards/Overlaycards'

//Assessments
import Entrylevel from "./Components/Assessments/Entrylevel/Entrylevel";
import Closelevel from "./Components/Assessments/Closelevel/Closelevel";
import Assessmentsstart from "./Components/Assessments/Assessmentsstart/Assessmentsstart";
import Dashboard from "./Dashboard/Dashboard";
import Courses from "./Dashboard/Components/Courses/Courses";
import CourseContent from "./Dashboard/Components/CourseContent/CourseContent";
import CourseDetails from "./Dashboard/Components/CourseDetails/CourseDetails";
import Profile from "./Dashboard/Components/Profile/Profile";
import Enrolled from "./Dashboard/Components/Enrolled/Enrolled";
import TestPage from "./Dashboard/Components/TestPage/TestPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={[
              <Landingpage />,
              <Management />,
              <Brands />,
              <Success />,
              <Engage />,
              <Partners />,
              <FindPricing />,
              <ContactUs />,
              <Footer />,
            ]}
          />
          <Route path="/entrylevel-start-page" element={<Entrylevel />} />
          <Route
            path="/entrylevel-start-page/quick-assessment"
            element={<Assessmentsstart />}
          />
          <Route path="/finish-assessment" element={<Closelevel />} />
          <Route path="/home" element={<Dashboard />}>
            <Route path="courses" index element={<Courses />}></Route>
            <Route path="profile" index element={<Profile />}></Route>
            <Route path="enrolled" index element={<Enrolled />}></Route>
            <Route path="test/:lessonId" index element={<TestPage />} />
            <Route
              path="courseContent"
              index
              element={<CourseContent />}
            ></Route>
            <Route
              path="courseDetails"
              index
              element={<CourseDetails />}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
