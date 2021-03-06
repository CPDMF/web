import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import Typography from 'components/Typography';
import { confirmAlert } from 'react-confirm-alert';
import { AuthContext } from '../../helpers/AuthContext';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  CardHeader,
  Row,
  Alert
} from 'reactstrap';

const LecturerCourseView = () => {
  const { id } = useParams();
  const { title } = useParams();

  const [courseImg, setCourseImg] = useState('');
  const [courseStatus, setCourseStatus] = useState('');
  const [content, setContent] = useState(null);
  const [result, setResult] = useState('');

  const { authState, setAuthState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    const formData = {
      cId: id,
    };
    axios
      .post('http://localhost:3001/csslcourse/getCourseImg', formData)
      .then(res => {
        setCourseImg(
          'http://localhost:3001/uploads/csslCourses/' + res.data[0].image,
        );
        setCourseStatus(res.data[0].status);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/getContentList', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setContent(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const confirmDelete = () => {
    confirmAlert({
      title: 'Confirm to Delete Course',
      message: 'Are you sure do you want to Delete ' + title + '?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteCourse(),
        },
        {
          label: 'No',
          onClick: () => redirectCourse(),
        },
      ],
    });
  };

  const confirmApproval = () => {
    confirmAlert({
      title: title,
      message: 'Confirm to Send to Approval.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => getApproval(),
        },
        {
          label: 'No',
          onClick: () => redirectCourse(),
        },
      ],
    });
  };

  const deleteContentConfirm = val => {
    confirmAlert({
      message: 'Confirm to Delete Content.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteSelectedContent(val),
        },
        {
          label: 'No',
          onClick: () => redirectCourse(),
        },
      ],
    });
  };

  const deleteCourse = () => {
    const sendData = {
      cId: id,
    };
    axios
      .post('http://localhost:3001/csslcourse/deleteCourse', sendData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //setResult('done');
          setTimeout(function () {
            redirectCourseList();
          }, 2000);
        }
      })
      .catch(error => {
        //setResult('err');
        setTimeout(
          function () {
            redirectCourseList();
          },

          2000,
        );
      });
  };

  const deleteSelectedContent = val => {
    const sendData = {
      courseId: id,
      contentId: val,
    };
    axios
      .post('http://localhost:3001/csslcourse/deleteCourseContent', sendData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setResult('done');
          setTimeout(
            function () {
              redirectCourseList();
              redirectCourse();
            },

            2000,
          );
        }
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            redirectCourseList();
            redirectCourse();
          },
          2000,
        );
      });
  };

  const getApproval = () => {
    const sendData = {
      cId: id,
    };
    axios
      .post('http://localhost:3001/csslcourse/getApproval', sendData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          redirectCourseList();
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const redirectCourseList = () => {
    let path = '/lecCourse';
    history.push(path);
  };

  const redirectCourse = () => {
    let path = '/courseView/cssl00' + id + '/' + title;
    history.push(path);
  };

  const setSelectedContent = event => {
    deleteContentConfirm(event.target.dataset.value);
  };

  const contentList =
    content &&
    content.map((content, i) => (
      <>
        <Row>
          <Col md={12} sm={6} xs={12} className="mb-3">
            <Card className="flex-row">
              <CardBody>
                <CardTitle>
                  <h4>{content.title}</h4>
                </CardTitle>
                <CardText>{content.description}</CardText>
                <Link
                  to={
                    '/csslcourse/editCourseContent/cssl00' +
                    id +
                    '/' +
                    title +
                    '/' +
                    content.contentId +
                    '/' +
                    content.title
                  }
                >
                  <Button color="warning">Edit</Button>
                </Link>{' '}
                <Button
                  color="danger"
                  data-value={content.contentId}
                  onClick={setSelectedContent}
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    ));

    function msg() {
      if (result == 'err') {
        return (
          <>
            <Alert color="danger">Unsuccessfull Attempt,Try Againg</Alert>
          </>
        );
      } else if (result == 'done') {
        return (
          <>
            <Alert color="success">Attempt Successfull</Alert>
          </>
        );
      }
    }

  return (
    <Page title="Course">
      <hr></hr>
      {courseStatus == 'OnGoing' && (
        <Link onClick={confirmApproval}>
          <Button color="success">Get Approval</Button>
        </Link>
      )}
      {'  '}
      <Link to={'/csslcourse/editCourse/cssl00' + id + '/' + title}>
        <Button color="warning">Edit Course</Button>
      </Link>
      {'  '}
      <Link onClick={confirmDelete}>
        <Button color="danger">Delete Course</Button>
      </Link>
      <br></br>
      <hr></hr>
      <Row>
        <Col sm="12">
          <CardHeader>
            <Typography>
              <h2>{title}</h2>
            </Typography>
            <hr></hr>
            <Link to={'/csslcourse/addCourseContent/cssl00' + id + '/' + title}>
              <Button color="primary">Add Content</Button>
            </Link>
            {'  '}
            <Link to="">
              <Button color="primary">Add Quiz</Button>
            </Link>
          </CardHeader>
          <br/>
          <center>{msg()}</center>
          
          <CardBody>
            <Card body>{contentList}</Card>
          </CardBody>
        </Col>
      </Row>
    </Page>
  );
};

export default LecturerCourseView;
