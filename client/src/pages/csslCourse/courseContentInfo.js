import React, { useState, useEffect } from "react";
import axios from "axios";
import "./courseContentInfo.css";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import TextEditor from "../../components/RichTextEditor";

function AddCourseContent(props) {
  const [contentTitle, setContentTitle] = useState("");
  const [contentDes, setContentDes] = useState("");
  const [contentType, setContentType] = useState("");
  const [note, setNote] = useState("");
  const [contentFile, setContentFile] = useState();
  const [videoLink, setVideoLink] = useState("");
  const [contentNum, setContentNum] = useState(0);

  const [uploadStatus, setUploadStatus] = useState("");

  //const cId = props.cid;
  const { id } = useParams();
  const { title } = useParams();
  //setCourseTitle(props.location.state);

  let history = useHistory();

  useEffect(() => {
    const sendData = {
      //id: props.cid,
      id: id,
    };
    axios
      .post("http://localhost:3001/csslcourse/getContentNo", sendData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log("response:", response.data[0].contentNo);

          if (response.data[0].contentNo != null) {
            setContentNum(response.data[0].contentNo + 1);
          } else {
            setContentNum(contentNum + 1);
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const InsertCourseContentNext = () => {
    const mId = "cssl001";
    const contentId = "cssl00" + id + "-0" + contentNum;
    console.log("ID:", contentId);

    const formData = new FormData();
    formData.append("courseId", id);
    formData.append("contentNo", contentNum);
    formData.append("contentId", contentId);
    formData.append("title", contentTitle);
    formData.append("description", contentDes);
    formData.append("type", contentType);
    formData.append("note", note);

    if (contentType == "File") {
      formData.append("cfile", contentFile);
    } else {
      formData.append("vlink", videoLink);
    }

    fetch("http://localhost:3001/csslcourse/courseContent", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setUploadStatus(res.msg);
        alert("Successfully Saved Details and Next Content");
        redirectCourse();
        redirectContentAdd();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InsertCourseContentFinish = () => {
    const mId = "cssl001";
    const contentId = "cssl00" + id + "-0" + contentNum;
    console.log("ID:", contentId);

    const formData = new FormData();
    formData.append("courseId", id);
    formData.append("contentNo", contentNum);
    formData.append("contentId", contentId);
    formData.append("title", contentTitle);
    formData.append("description", contentDes);
    formData.append("type", contentType);
    formData.append("note", note);

    if (contentType == "File") {
      formData.append("cfile", contentFile);
    } else {
      formData.append("vlink", videoLink);
    }

    fetch("http://localhost:3001/csslcourse/courseContent", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setUploadStatus(res.msg);
        alert("Successfully Saved Details and Finish");
        redirectCourse();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const redirectContentAdd = () => {
    let path = "/addCourseContent/cssl00" + id + "/" + title;
    history.push(path);
  };

  const redirectCourseList = () => {
    let path = "/lecCourse";
    history.push(path);
  };

  const redirectCourse = () => {
    let path = "/courseView/cssl00" + id + "/" + title;
    history.push(path);
  };

  const resetComponents = () => {
    setContentTitle("");
    setContentDes("");
    setContentType("");
    setContentFile();
    setVideoLink("");
    setNote("");
  };
  const setEditorValue = (val) => {
    setNote(val);
  };

  return (
    <div className="content-basic-info-main">
      <div className="content-basic-info">
        <h2 className="content-basic-info-title">COURSE CONTENT DETAILS</h2>
        <hr></hr>
        <div className="content-basic-info-form">
          <h3 className="content-basic-info-title">{title}</h3>
          <input
            type="submit"
            className="content-btn-redirect-list"
            value="Course List"
            onClick={redirectCourseList}
          />
          <input
            type="submit"
            className="content-btn-redirect-course"
            value="Go to Course"
            onClick={redirectCourse}
          />
          <div className="content-basic-info-block">
            <div className="content-field-block">
              <h4 className="content-info-title">Title</h4>
              <input
                className="input"
                value={contentTitle}
                placeholder="--Content Title--"
                onChange={(e) => setContentTitle(e.target.value)}
              ></input>
            </div>


            <div className="content-field-block">
              <h4 className="content-info-title">Description</h4>
              <textarea
                value={contentDes}
                onChange={(e) => setContentDes(e.target.value)}
              ></textarea>
            </div>


            <div className="content-field-block">
              <h4 className="content-info-title">Note</h4>
              <TextEditor onValueChange={setEditorValue} />
            </div>

            <div className="content-field-block">
              <h4 className="content-info-title">Cotnent Type</h4>
              <select
                name="select"
                value={contentType}
                id="content-type"
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="">--Select Content Type--</option>
                <option value="File">File</option>
                <option value="Video">Video</option>
              </select>
            </div>

            {renderContentAdd(contentType)}
          </div>

          <div className="content-btn-block">
            <input
              type="submit"
              className="content-btn-submit"
              value="Save & Finish"
              onClick={InsertCourseContentFinish}
            />
            <input
              type="submit"
              className="content-btn-submit"
              value="Save & Next Content"
              onClick={InsertCourseContentNext}
            />
          </div>
        </div>
      </div>
    </div>
  );

  function renderContentAdd(type) {
    if (type == "File") {
      return (
        <div className="content-field-block">
          <h4 className="content-info-title">Content File</h4>
          <input
            type="file"
            className="input"
            id="content-file"
            name="content-file"
            accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, image/*"
            onChange={(e) => setContentFile(e.target.files[0])}
          ></input>
        </div>
      );
    } else if (type == "Video") {
      return (
        <div className="content-field-block">
          <h4 className="content-info-title">Video Link</h4>
          <h7>(Upload Video to Youtube and Place Youtube Video Link here.)</h7>
          <input
            className="input"
            value={videoLink}
            placeholder="--Youtube Video Link--"
            onChange={(e) => setVideoLink(e.target.value)}
          ></input>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default AddCourseContent;
