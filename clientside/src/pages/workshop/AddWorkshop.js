import { Link } from 'react-router-dom';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';
import classnames from 'classnames';
import Typography from 'components/Typography';

import { useHistory } from 'react-router-dom';

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

function AddWorkshop() {
  const { authState, setAuthState } = useContext(AuthContext);

  const [workshopId, setWorkshopId] = useState();
  const [title, setWorkshopTitle] = useState('');
  const [description, setWorkshopDes] = useState('');
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [duration, setDuration] = useState('');
  const [credit, setCredit] = useState('');
  const [workshopGenaratedID, setWorkshopIdGenarated] = useState('');

  const [subject, setSubject] = useState('');
  const [image, setImage] = useState(null);

  const [result, setResult] = useState();

  let history = useHistory();
  // const [about, setAbout] = useState('');
  // const [desc, setDesc] = useState('');
  // const [image, setBlogImage] = useState(null);
  // const { authState, setAuthState } = useContext(AuthContext);
  // const [result, setResult] = useState();

  // var today = new Date(),
  //   Currentdate =
  //     today.getFullYear() +
  //     '-' +
  //     (today.getMonth() + 1) +
  //     '-' +
  //     today.getDate();
  // let history = useHistory();

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt,Try Again</Alert>
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

  const addWorkshop = () => {
    const formData = new FormData();

    formData.append('workshopId', workshopId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    formData.append('duration', duration);
    //formData.append('credit', credit);
    formData.append('memberId', authState.id);

    formData.append('image', image);
    formData.append('subject', subject);
    //alert(image);
    fetch('http://localhost:3001/workshop/addWorkshop', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        setWorkshopIdGenarated(res.data.insertId);
        console.log(res.data.insertId);
        setResult('done');
        setTimeout(
          function () {
            history.push('/AddWorkshopConducter/' + res.data.insertId);
          },

          500,
        );
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            history.push('/workshop');
            history.push('/addWorkshop');
          },

          2000,
        );
        console.log(error);
      });
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return (
    <Page title="Add Workshop">
      <Link to="/workshop">
        <Button color="primary">Workshop List</Button>
      </Link>
      <hr></hr>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}
          <Card>
            <CardHeader>New Workshop</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Title
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="email"
                      onChange={event => {
                        setWorkshopTitle(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Category
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="email"
                      onChange={event => {
                        setSubject(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Description
                  </Label>

                  <Col sm={9}>
                    <Input
                      type="textarea"
                      name="title"
                      onChange={e => setWorkshopDes(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Location
                  </Label>

                  <Col sm={9}>
                    <Input
                      type="textarea"
                      name="title"
                      onChange={e => setLocation(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    From Date
                  </Label>
                  <Col sm={9}>
                    <Input
                      className="input"
                      required
                      type="date"
                      min={today}
                      onChange={e => setFromDate(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    To Date
                  </Label>

                  <Col sm={9}>
                    <Input
                      type="date"
                      name="select"
                      required
                      min={fromDate}
                      onChange={e => setToDate(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="12" md={{ size: 3, offset: 0 }}>
                    <Label for="exampleEmail">Duration</Label>
                  </Col>
                  <Col sm="12" md={{ size: 3, offset: 0 }}>
                    <Input
                      className="input"
                      required
                      max="24"
                      min="0"
                      type="number"
                      onChange={e => setDuration(e.target.value)}
                    />
                  </Col>
                  <Col sm="12" md={{ size: 4, offset: 0 }}>
                    <Label for="exampleEmail">Hours Per Day</Label>
                  </Col>
                </FormGroup>

                {/* <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Credit
                  </Label>
                  <Col sm={9}>
                    <Input
                      required
                      className="input"
                      type="number"
                     onChange={e => setCredit(e.target.value)}
                    />
                  </Col>
                </FormGroup> */}

                <FormGroup row>
                  <Label for="exampleEmail" sm={12}>
                    Import Your Workshop Image From the Chooser
                  </Label>
                  <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <center>
                      {image && (
                        <img
                          className="writeImg"
                          height="60%"
                          width="60%"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                      )}
                    </center>
                  </Col>

                  <Col sm="12" md={{ size: 6, offset: 4 }}>
                    <Input
                      type="file"
                      className="input"
                      id="avatar"
                      name="avatar"
                      required
                      accept="image/*"
                      onChange={e => setImage(e.target.files[0])}
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={addWorkshop} color="success">
                      Add
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </center>
      </Col>
      <hr></hr>
    </Page>
  );
}

export default AddWorkshop;
