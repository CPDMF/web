import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import logo200Image from 'assets/img/logo/logo_200.png';

import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  CardTitle,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
// let history = useHistory();

const ForgotPassword = props => {
  const [username, setUsername] = useState('');
  const [errorUser, setErrorUser] = useState('');
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const handlerUser = event => {
    setErrorUser('');
  };

  let history = useHistory();
  axios.defaults.withCredentials = true;

  const Reset = () => {
    if (username == '') {
      setErrorUser('* Username is required');
    } else {
      const data = { username: username };

      axios.post('http://localhost:3001/auth/forgot', data).then(response => {
        if (response.data.errorUser) {
          setErrorUser(response.data.errorUser);
        } else {
          setModal(!modal);
        }
      });
    }
  };
  const Redirect = () => {
    setModal(!modal);
    history.push('./');
  };

  return (
    <Row className="loginForm">
      <Col sm="6" md={{ size: 4, offset: 4 }}>
        <center>
          <div>
            <Modal isOpen={modal} toggle={Reset} className={className}>
              <ModalHeader toggle={Reset}>Email Sent</ModalHeader>
              <ModalBody>
                Reset link has been sent your email address. Please check your
                email.
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={Redirect}>
                  Done
                </Button>{' '}
              </ModalFooter>
            </Modal>
          </div>
          <Card>
            <CardHeader>
              {' '}
              <img
                src={logo200Image}
                className="rounded"
                style={{ width: 60, height: 60, cursor: 'pointer' }}
                alt="logo"
              />
            </CardHeader>

            <CardBody>
              <CardTitle tag="h6" className="mb-4 mt-1 text-left">
                Please enter your email address
              </CardTitle>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    User Name
                  </Label>
                  <Col sm={6}>
                    <Input
                      type="text"
                      onChange={event => {
                        setUsername(event.target.value);
                      }}
                      onKeyPress={e => handlerUser(e)}
                      className="user"
                      required
                    />
                  </Col>
                </FormGroup>
                <div className="mb-2 text-danger">
                  <b>{errorUser}</b>
                </div>

                <FormGroup check row>
                  <Col sm={6}>
                    <Button
                      className="buttonDIV"
                      onClick={Reset}
                      color="success"
                    >
                      Send
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </center>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
