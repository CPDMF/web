import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import { AuthContext } from "./helpers/AuthContext";

import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import settings from "./components/settingsAndInfo/settings";
import profileInfo from "./components/settingsAndInfo/Infor";
import PageNotFound from "./pages/pageNotFound";
import PaymentModal from "./pages/payment";

//professional
import dashboardPro from "./pages/professional/dashboard";
import cpdPro from "./pages/professional/cpd";
import cpdAddPro from "./pages/professional/cpdAdd";

import coursMyView from "./pages/professional/coursMyView";
import courseEnrollP from "./pages/professional/coursEnrollment";
import courseReviewP from "./pages/professional/coursReviews";

import workshopPro from "./pages/professional/workshops";
import workshopViewPro from "./pages/professional/workshopsView";
import blogsPro from "./pages/professional/blog";
import addBlogPro from "./pages/professional/addBlog";
import forumPro from "./pages/professional/forum";
import reportsPro from "./pages/professional/reports";

import jobView from "./pages/professional/job";
import jobAddvertisment from "./pages/professional/jobView";
import addJobCV from "./pages/professional/addCV";
import questionare from "./pages/professional/questionare";

import createCV from "./pages/professional/genarateCV";

import paymentsPro from "./pages/professional/payments";

import csslCourses from "./pages/professional/course";
import courseView from "./pages/professional/courseView";
import courseInfo from "./pages/csslCourse/basicDetails";
import courseContentInfo from "./pages/csslCourse/courseContentInfo";
import lecCourseList from "./pages/csslCourse/lecturingCourseList";
import lecturerCourseView from "./pages/csslCourse/lecturerCourseView";
import editCourseContent from "./pages/csslCourse/editCourseContent";
import editCourseInfo from "./pages/csslCourse/editCourseDetails";

//chartered
import dashboardCha from "./pages/chartered/dashboard";
import cpdCha from "./pages/chartered/cpd";
import courseCha from "./pages/chartered/course";
import blogCha from "./pages/chartered/blog";
import forumCha from "./pages/chartered/forum";
import workshopCha from "./pages/chartered/workshop";
import reportsCha from "./pages/chartered/reports";
import jobCha from "./pages/chartered/job";
import paymentsCha from "./pages/chartered/payments";

//Student
import dashboardStu from "./pages/student/dashboard";
import blogStu from "./pages/student/blog";
import courseStu from "./pages/student/course";
import forumStu from "./pages/student/forum";
import paymentsStu from "./pages/student/payments";
import reportsStu from "./pages/student/reports";
import workshopStu from "./pages/student/workshop";

//Associate
import dashboardAss from "./pages/associate/dashboard";
import blogAss from "./pages/associate/blog";
import courseAss from "./pages/associate/course";
import forumAss from "./pages/associate/forum";
import paymentsAss from "./pages/associate/payments";
import reportsAss from "./pages/associate/reports";
import jobAss from "./pages/associate/job";

//Secretary
import dashboardSec from "./pages/secretary/dashboard";
import addJob from "./pages/secretary/addJob";
import addQuestion from "./pages/secretary/addQuestion";
import addWorkshops from "./pages/secretary/addWorkshops";

import ViewCurrentJobs from "./pages/secretary/viewCurrentJobs";
import editDeleteJob from "./pages/secretary/editDeleteJob";

import manageWorkshop from "./pages/secretary/manageWorkshop";
import paymentsSec from "./pages/secretary/payment";
import regApprove from "./pages/secretary/regApprove";
import regPending from "./pages/secretary/regPending";
import regRejected from "./pages/secretary/regRejected";

//council
import dashboardCou from "./pages/council/dashboard";
import addJobCou from "./pages/council/addJob";
import blogsCou from "./pages/council/blogs";
import verifyWorkshop from "./pages/council/verifyWorkshop";
import paymentCou from "./pages/council/payment";
import reportCou from "./pages/council/report";
import regPendingCou from "./pages/council/regPendingC";
import regApproveCou from "./pages/council/regApproveC";
import regRejectedCou from "./pages/council/regRejectedC";
import cpdCou from "./pages/council/cpd";

function App() {
  const [authState, setAuthState] = useState({
    fname: "",
    lname: "",
    role: "",
    id: 0,
    profileImage: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            fname: response.data.firstName,
            lname: response.data.lastName,
            role: response.data.role,
            id: response.data.id,
            profileImage: response.data.profileImage,
            status: true,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Switch>
          {!authState.status && (
            <>
              <Route path="/" exact component={Login} />
              <Route path="/registration" exact component={Registration} />
              
            </>
          )}
          {authState.role == "student" && (
            <>
              <Navbar />
              <Route path="/dashboardStu" exact component={dashboardCha} />
              <Route path="/courseS" component={courseStu} />
              <Route path="/workshopS" component={workshopStu} />
              <Route path="/blogS" component={blogStu} />
              <Route path="/forumS" component={forumStu} />
              <Route path="/reportsS" component={reportsStu} />
              <Route path="/paymentsS" component={paymentsStu} />
              <Route path="/settings" exact component={settings} />
              <Route path="/profileInfor" exact component={profileInfo} />
            </>
          )}

          {authState.role == "associate" && (
            <>
              <Navbar />
              <Route path="/dashboardA" exact component={dashboardAss} />
              <Route path="/courseA" component={courseAss} />
              <Route path="/blogA" component={blogAss} />
              <Route path="/forumA" component={forumAss} />
              <Route path="/reportsA" component={reportsAss} />
              <Route path="/jobA" component={jobAss} />
              <Route path="/paymentsA" component={paymentsAss} />
              <Route path="/settings" exact component={settings} />
              <Route path="/profileInfor" exact component={profileInfo} />
            </>
          )}

          {authState.role == "professional" && (
            <>
              <Navbar />

              <Route path="/dashboardP" exact component={dashboardPro} />
              <Route path="/coursMyViewP/:id" component={coursMyView} />
              <Route path="/coursEnrollsP/:id" component={courseEnrollP} />
              <Route path="/courseReviewP/:id" component={courseReviewP} />
              <Route path="/workshopP" component={workshopPro} />
              <Route path="/workshopViewP" component={workshopViewPro} />
              <Route path="/addBlogs" component={addBlogPro} />
              <Route path="/blogP" component={blogsPro} />
              <Route path="/forumP" component={forumPro} />
              <Route path="/reportsP" component={reportsPro} />
              <Route path="/job" component={jobView} />
              <Route
                path="/jobAddvertisment/:id"
                component={jobAddvertisment}
              />
              <Route path="/addJobCV/:id:finalMarks" component={addJobCV} />
              <Route path="/questionare/:id" component={questionare} />
              <Route path="/createCV" component={createCV} />
              <Route path="/paymentsP" component={paymentsPro} />
              <Route path="/lecCourse" component={lecCourseList} />
              <Route path="/addCourse" component={courseInfo} />

              {/*CPD Records Related Routes*/}
              <Route exact path="/csslmember/cpdrecords" component={cpdPro} />
              <Route exact path="/csslmember/cpdrecords/addcpdrecord" component={cpdAddPro} />

              {/*Course Related Routes*/}
              <Route exact path="/csslcourses" component={csslCourses} />
              <Route
                exact path="/csslcourses/courseview/cssl00:id/:title"
                component={courseView}
              />
              <Route
                path="/addCourseContent/cssl00:id/:title"
                component={courseContentInfo}
              />
              <Route
                path="/courseView/cssl00:id/:title"
                component={lecturerCourseView}
              />
              <Route
                path="/editCourse/cssl00:id/:title"
                component={editCourseInfo}
              />
              <Route
                path="/editCourseContent/cssl00:id/:title/:cntId/:cntTitle"
                component={editCourseContent}
              />

              <Route path="/settings" exact component={settings} />
              <Route path="/profileInfor" exact component={profileInfo} />
            </>
          )}

          {authState.role == "chartered" && (
            <>
              <Navbar />
              <Route path="/dashboardC" exact component={dashboardCha} />
              <Route path="/cpdP" component={cpdPro} />
              <Route path="/addCPD" component={cpdAddPro} />
              <Route path="/courseP" component={courseCha} />
              <Route path="/coursViewP/:id" component={courseView} />
              <Route path="/coursMyViewP/:id" component={coursMyView} />
              <Route path="/coursEnrollsP/:id" component={courseEnrollP} />
              <Route path="/courseReviewP/:id" component={courseReviewP} />
              <Route path="/workshopP" component={workshopPro} />
              <Route path="/workshopViewP" component={workshopViewPro} />
              <Route path="/blogP" component={blogsPro} />
              <Route path="/forumP" component={forumPro} />
              <Route path="/reportsC" component={reportsCha} />
              <Route path="/job" component={jobView} />
              <Route
                path="/jobAddvertisment/:id"
                component={jobAddvertisment}
              />
              <Route path="/questionare/:id" component={questionare} />
              <Route path="/createCV" component={createCV} />
              <Route path="/paymentsP" component={paymentsPro} />
              <Route path="/settings" exact component={settings} />
              <Route path="/profileInfor" exact component={profileInfo} />
            </>
          )}

          {authState.role == "secretariat" && (
            <>
              <Navbar />
              <Route path="/dashboardSec" exact component={dashboardSec} />
              <Route path="/ViewCurrentJobs" component={ViewCurrentJobs} />

              <Route path="/addQuestions" component={addQuestion} />

              <Route path="/addNewJob" component={addJob} />
              <Route path="/editDeleteJob/:id" component={editDeleteJob} />
              <Route path="/manWorkshop" component={manageWorkshop} />
              <Route path="/addWorkshops" component={addWorkshops} />
              <Route path="/regApprove" component={regApprove} />
              <Route path="/regPending" component={regPending} />
              <Route path="/regRejected" component={regRejected} />
              <Route path="/paymentsSec" component={paymentsSec} />
              <Route path="/settings" exact component={settings} />
              <Route path="/profileInfor" exact component={profileInfo} />
            </>
          )}

          {authState.role == "council" && (
            <>
              <Navbar />
              <Route path="/dashboardCou" exact component={dashboardCou} />
              <Route path="/jobCou" component={addJobCou} />
              <Route path="/blogCou" component={blogsCou} />
              <Route path="/workshopCou" component={verifyWorkshop} />
              <Route path="/reportsCou" component={reportCou} />
              <Route path="/regPendingC" component={regPendingCou} />
              <Route path="/regRejectedC" component={regRejectedCou} />
              <Route path="/regApproveC" component={regApproveCou} />
              <Route path="/paymentCou" component={paymentCou} />
              <Route path="/cpdCou" component={cpdCou} />
              <Route path="/settings" exact component={settings} />
              <Route path="/profileInfor" exact component={profileInfo} />
            </>
          )}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
