import React from "react";
import "./style/course.css";
import courseImg from "../../imgs/course1.jpg";
import courseImg2 from "../../imgs/course2.jpg";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { Link  } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CircularProgress } from "@material-ui/core";
function course() {
  const id = "1";
  return (
    <>
    <Tabs style={{ paddingTop: "65px",paddingLeft:"3px" }}>
            <TabList>
          <Tab>My Courses</Tab>
          <Tab>Courses</Tab>
        </TabList>
        <TabPanel>
        <div className="search">
        <input placeholder="Categories"></input>
      </div>

      <div className="mainCourses">
       <Link to={"/coursViewP/"+id }  className="Link">
       <div className="course" >
          <div className="">
          <img src={courseImg} className="courseImg"></img>
          </div>
          <div className="courseDes">
            <h2>The Complete Java and Android Studio Course for Beginners</h2>
            <p>Learn how to code in Java and master Android Studio</p>
            <img src={star4} className="rating"></img>

          </div>
        </div>
  
       </Link>

        <div className="course">
          <div className="">
          <img src={courseImg2} className="courseImg"></img>
          </div>
          <div className="courseDes">
            <h2>The Complete Java and Android Studio Course for Beginners</h2>
            <p>Learn how to code in Java and master Android Studio</p>
            <img src={star1} className="rating"></img>

          </div>
        </div>
      </div>

      
        </TabPanel>
        <TabPanel>
          
        </TabPanel>
  
      </Tabs>
      
    </>
  );
}

export default course;
