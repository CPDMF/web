import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Page from 'components/Page';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Alert,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

const EditCourseContent = () => {
  const [contentTitle, setContentTitle] = useState('');
  const [contentDes, setContentDes] = useState('');
  const [contentType, setContentType] = useState('');
  const [contentFile, setContentFile] = useState();
  const [videoLink, setVideoLink] = useState('');

  const [uploadStatus, setUploadStatus] = useState('');

  //const cId = props.cid;
  const { id } = useParams();
  const { title } = useParams();
  const { cntId } = useParams();
  const { cntTitle } = useParams();
  //setCourseTitle(props.location.state);

  let history = useHistory();

  useEffect(() => {
    const sendData = {
      //id: props.cid,
      cId: id,
      cntId: cntId,
    };
    axios
      .post('http://localhost:3001/csslcourse/getContentInfo', sendData)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setComponents(response.data[0]);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const updateCourseContent = () => {
    const formData = new FormData();
    formData.append('courseId', id);
    formData.append('contentId', cntId);
    formData.append('title', contentTitle);
    formData.append('description', contentDes);
    formData.append('type', contentType);

    if (contentType == 'File') {
      formData.append('cfile', contentFile);
    } else {
      formData.append('vlink', videoLink);
    }

    fetch('http://localhost:3001/csslcourse/editCourseContent', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        setUploadStatus(res.msg);
        alert('Successfully Saved Details');
        redirectCourse();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const redirectCourse = () => {
    let path = '/courseView/cssl00' + id + '/' + title;
    history.push(path);
  };

  const setComponents = record => {
    setContentTitle(record.title);
    setContentDes(record.description);
    setContentType(record.contentType);
    if (record.contentType == 'File') {
      setContentFile(record.content);
    } else {
      setVideoLink(record.content);
    }
  };

  const display = val => {
    console.log(val);
  };


return (
  <Page title="Course Content Details">
    <hr></hr>
    <CardBody>
      <h4>{title}</h4>
      <Button color="primary" onClick={redirectCourse}>
      Back to Course
      </Button>{' '}
      
    </CardBody>
    <hr></hr>
    <Col sm="10" md={{ size: 8, offset: 2 }}>
      <Card>
        <CardHeader><center>Edit Content</center></CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Title{' '}
              </Label>
              <Col sm={9}>
                <Input
                  className="input"
                  value={contentTitle}
                  placeholder="Add Title"
                  onChange={e => setContentTitle(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Description{' '}
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  value={contentDes}
                  onChange={e => setContentDes(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Note
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  className="note"
                  placeholder="Description"
                  onChange={e => setContentDes(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Course Type
              </Label>
              <Col sm={9}>
                <Input
                  type="select"
                  name="select"
                  value={contentType}
                  id="content-type"
                  onChange={e => setContentType(e.target.value)}
                >
                  <option value="">--Select Content Type--</option>
                  <option value="File">File</option>
                  <option value="Video">Video</option>
                </Input>
              </Col>
            </FormGroup>

            {renderContentAdd(contentType)}

            <FormGroup check row>
              <center>
                
                <Button color="success" onClick={updateCourseContent}>
                Update
                </Button>
              </center>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Col>
    <hr></hr>
  </Page>
);

function renderContentAdd(type) {
  if (type == 'File') {
    return (
      <FormGroup row>
        <Label for="exampleEmail" sm={3}>
          File
        </Label>
        <Col sm={9}>
          <Input
            type="file"
            className="input"
            id="content-file"
            name="content-file"
            accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, image/*"
            onChange={e => setContentFile(e.target.files[0])}
          />
        </Col>
      </FormGroup>
    );
  } else if (type == 'Video') {
    return (
      <FormGroup row>
        <Label for="exampleEmail" sm={3}>
          Video Link
        </Label>
        <Col sm={9}>
          <Input
            className="input"
            value={videoLink}
            placeholder="--Youtube Video Link--"
            onChange={e => setVideoLink(e.target.value)}
          />
        </Col>
      </FormGroup>
    );
  } else {
    return <FormGroup row></FormGroup>;
  }
}
}
export default EditCourseContent;