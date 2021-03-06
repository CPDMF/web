import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';
import Typography from 'components/Typography';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
  Col,
  Alert,
  CardHeader,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { AuthContext } from '../../helpers/AuthContext';

const Profile = props => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [ProfileData, setProfileData] = useState();
  const memberId = authState.id;

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [NIC, setNIC] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [proPic, setProfileImage] = useState('');
  const [image, setFileName] = useState('');
  const [requestRole, setrequestRole] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [result, setResult] = useState();
  const [resultBasic, setResultBasic] = useState();
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [paymentPrice, setpaymentPrice] = useState(0);
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const [eligibility, setEligibility] = useState(0);

  const toggle = () => setModal(!modal);

  const [imgFile, setImgFile] = useState();
  const setEditabledJobApp = () => {
    document.getElementById('myInput').removeAttribute('readonly');
    document.getElementById('myInput2').removeAttribute('readonly');
    document.getElementById('myInput3').removeAttribute('readonly');
    document.getElementById('myInput4').removeAttribute('readonly');
    document.getElementById('myInput5').removeAttribute('readonly');
    document.getElementById('myInput6').removeAttribute('readonly');
    document.getElementById('myInput7').removeAttribute('readonly');
  };

  const updateData = () => {
    const formData2 = {
      memberId: memberId,
      firstName: firstName,
      secondName: secondName,
      email: email,
      nic: NIC,
      address: address,
      contact: contact,
      dob: dob,
    };

    axios
      .post('http://localhost:3001/auth/updateBasicDetails', formData2)
      .then(response => {
        if (response.data.error) {
          setResultBasic('eee');
          setTimeout(
            function () {
              // history.push('/jobadvertisements');
            },

            2000,
          );
        } else {
          setResultBasic('ok');
          setTimeout(
            function () {
              // history.push('/jobadvertisements');
            },

            2000,
          );
        }
      })
      .catch(error => {});
  };
  let history = useHistory();

  const [paid, setPaid] = useState(0);
  useEffect(() => {
    const data = {
      id: authState.memberId,
      amount: paymentPrice,
      role: authState.role,
      email: authState.email,
      fName: authState.fName,
      paid: paid,
    };
    axios
      .post('http://localhost:3001/auth/memberpayment', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          console.log('succesful');
        }
      })
      .catch(error => {
        //alert(error);
      });
  }, [paid]);

  //credits
  useEffect(() => {
    const data = {
      id: authState.memberId,      
    };
    axios
      .post('http://localhost:3001/auth/charteredReq', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const credits = response.data;
          if(credits>500){
            setEligibility(1);
          }
        }
      })
      .catch(error => {
        //alert(error);
      });
  }, []);

  //paid or not
  useEffect(() => {
    const data = {
      id: authState.memberId,
    };
    axios
      .post('http://localhost:3001/auth/paymentVerfication', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setPaymentStatus(response.data[0].paymentID);
        }
      })
      .catch(error => {
        if (authState.role == 'student') {
          setpaymentPrice(500);
        } else if (authState.role == 'assocaite') {
          setpaymentPrice(1000);
        } else if (authState.role == 'professional') {
          setpaymentPrice(1500);
          console.log('anushka');
        } else if (authState.role == 'chartered') {
          setpaymentPrice(2000);
        }
      });
  }, []);

  // Put the payment variables here
  var payhere = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: '1218666', // Replace your Merchant ID
    return_url: './profile',
    cancel_url: './profile',
    notify_url: 'http://localhost:3001/auth/memberpayment',
    order_id: authState.id,
    items: 'Membership Payment',
    amount: paymentPrice,
    currency: 'LKR',
    first_name: authState.fname,
    last_name: authState.lname,
    email: authState.email,
    phone: '',
    address: '',
    city: '',
    country: '',
    delivery_address: '', // optional field
    delivery_city: '', // optional field
    delivery_country: '', // optional field
    custom_1: '', // optional field
    custom_2: '', // optional field
  };

  //Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted() {
    setPaid(1);
    window.location.reload(false);

    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    history.push('./profile');
    //Note: Prompt user to pay again or show an error page
    console.log('Payment dismissed');
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log('Error:' + error);
  };

  function pay() {
    window.payhere.startPayment(payhere);
  }

  function msg() {
    if (resultBasic == 'eee') {
      return (
        <>
          <Alert color="danger">Unable To Update Profile,Try Againg</Alert>
        </>
      );
    } else if (resultBasic == 'ok') {
      return (
        <>
          <Alert color="success">Profile Updated Succesfully</Alert>
        </>
      );
    }
  }

  function msgPasswords() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt,Try Againg</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Greate Attempt is Successful</Alert>
        </>
      );
    } else if (result == 'passwordmiss') {
      return (
        <>
          <Alert color="danger">Confirm Password Is Invalid</Alert>
        </>
      );
    } else if (result == 'passwordmiss') {
      return (
        <>
          <Alert color="danger">Current Password Is Invalid</Alert>
        </>
      );
    }
  }
  const updatePassword = () => {
    const formData2 = {
      memberId: memberId,
      currentPass: currentPassword,
      newPass: newPassword,
      confirmPass: confirmPassword,
    };
    if (newPassword !== confirmPassword) {
      setResult('passwordmiss');
      setTimeout(
        function () {},

        2000,
      );
    } else {
      axios
        .post('http://localhost:3001/auth/updatePassword', formData2)
        .then(response => {
          if (response.data.errorPass === 'errorCurrent') {
            setResult('errorCurrent');
            setTimeout(
              function () {
                // history.push('/jobadvertisements');
              },

              2000,
            );
            //Password MissMatch
          } else if (response.data.errorPass === 'error') {
            setResult('error');
            setTimeout(
              function () {
                // history.push('/jobadvertisements');
              },

              2000,
            );
          } else {
            setResult('done');
            setTimeout(
              function () {
                // history.push('/jobadvertisements');
              },

              2000,
            );
          }
        })
        .catch(error => {
          setResult('error');
          setTimeout(
            function () {
              //history.push('/jobadvertisements');
            },

            2000,
          );
        });
    }
  };

  const addProfilPic = () => {
    const formData = new FormData();
    formData.append('image', imgFile);
    formData.append('memberId', memberId);
    fetch('http://localhost:3001/auth/updateProfileImage', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        setResultBasic('ok');
        setTimeout(
          function () {
            history.push('/dashboard');
            history.push('/profile');
          },

          2000,
        );
      })
      .catch(error => {
        setResultBasic('eee');
        setTimeout(
          function () {
            // history.push('/jobadvertisements');
          },

          2000,
        );
      });
  };

  useEffect(() => {
    const data = {
      memberId: authState.id,
    };

    axios
      .post('http://localhost:3001/auth/getProfileData', data)

      .then(response => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          setFirstName(response.data[0].firstName);
          setSecondName(response.data[0].lastName);
          setAddress(response.data[0].residentialAddress);
          setEmail(response.data[0].email);
          setContact(response.data[0].contactNumber);
          setNIC(response.data[0].nic);
          setDOB(response.data[0].birthDate);
          setProfileImage(response.data[0].profileImage);
        }
      })
      .catch(error => {
        //   alert(error);
      });
  }, []);

  const addDataFile = () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', authState.id);
    formData.append('memberID', authState.memberId);
    formData.append('role', authState.role);
    formData.append('fname', authState.fname);
    formData.append('lname', authState.lname);
    formData.append('email', authState.email);
    if(authState.role == "professional" && eligibility==1){
      const role = "chartered"
      formData.append('requestRole', role);
    }
    else{
      formData.append('requestRole', requestRole);
    }

    // alert(image);
    fetch('http://localhost:3001/auth/upgrade', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
    .then(res => res.json())
      .then(res => {
        setResult('done');
        setTimeout(
          function () {
            toggle();
          },

          2000,
        );
      })
      .catch(error => {
        setTimeout(
          function () {
            history.push('/jobadvertisements');
          },

          2000,
        );
      });
  };
  function message() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccefull Attempt,Try Againg</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Succesfully Requested</Alert>
        </>
      );
    }
  }

  return (
    <Page title="Profile">
      <Row>
        <Col lg={7} md={8} sm={8} xs={12}>
          <br></br>
          <center>{msg()}</center>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>
              <b>Upgrade Membership</b>
            </ModalHeader>
            {message()}
            <ModalBody>
              Dear {authState.fName} {authState.lname}, we kindly request you to
              submit the necessary documents needed to upgrade your membership
              status. Such as offer letters, company letters. It will be
              reviewed by CSSL council officers and let you know about your
              status.
              <br />
              <br />
              <Input
                type="file"
                className="input"
                id="course-img"
                name="course-img"
                accept="zip/war/pdf"
                onChange={e => setFileName(e.target.files[0])}
              />
              <p>
                <small className="text-danger">
                  Only attach zip, rar files
                </small>
              </p>
              {authState.role != "professional" && eligibility==1 && (
                <>
              <p>
                <b>Select the requesting position</b>
              </p>
              <Input
                type="select"
                name={requestRole}
                onChange={e => setrequestRole(e.target.value)}
                className="bg-light"
              >
                <option value="">Requesting Role</option>
                <option value="associate">Associate</option>
                <option value="professional">Professional</option>
              </Input>
              <br />
              </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={addDataFile}>
                Request
              </Button>{' '}
            </ModalFooter>
          </Modal>
          <Card>
            <CardHeader>Profile Information</CardHeader>

            <CardBody>
              <Card className="mb-2">
                <br></br>
                <CardBody>
                  <center>
                    {imgFile && (
                      <img
                        className="writeImg"
                        width="150px"
                        height="150px"
                        className="profileImgN"
                        src={URL.createObjectURL(imgFile)}
                        alt=""
                      />
                    )}
                    <br></br>
                    <br></br>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Add Profile Image{' '}
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="file"
                          className="setting-info-title"
                          id="profile-img"
                          name="profile-img"
                          accept="image/*"
                          onChange={e => setImgFile(e.target.files[0])}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <center>
                        <Col sm={{ size: 15 }}>
                          <Button onClick={addProfilPic} color="success">
                            Update Profile Picture
                          </Button>
                        </Col>
                      </center>
                    </FormGroup>{' '}
                  </center>
                </CardBody>
              </Card>
              <br></br>
              <center>
                <Button color="primary" onClick={setEditabledJobApp}>
                  Edit My Profile Details
                </Button>
              </center>
              <br></br>

              <Card className="mb-2">
                <CardBody>
                  <FormGroup row>
                    <Label for="exampleEmail" name="lbl1" sm={3}>
                      First Name
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="text"
                        className="note"
                        placeholder="Description"
                        id="myInput"
                        name="input"
                        readOnly
                        value={firstName}
                        onChange={event => {
                          setFirstName(event.target.value);
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={3}>
                      Second Name
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="text"
                        className="note"
                        placeholder="Description"
                        id="myInput2"
                        readOnly
                        name="input"
                        value={secondName}
                        onChange={event => {
                          setSecondName(event.target.value);
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={3}>
                      NIC Number
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="text"
                        value={NIC}
                        className="note"
                        placeholder="Description"
                        id="myInput3"
                        readOnly
                        name="input"
                        onChange={event => {
                          setNIC(event.target.value);
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={3}>
                      Address{' '}
                    </Label>
                    <Col sm={9}>
                      <Input
                        value={address}
                        type="textarea"
                        className="note"
                        placeholder="Description"
                        id="myInput4"
                        readOnly
                        name="input"
                        onChange={event => {
                          setAddress(event.target.value);
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={3}>
                      Contact Number{' '}
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="test"
                        value={contact}
                        className="note"
                        placeholder="Description"
                        id="myInput5"
                        readOnly
                        name="input"
                        onChange={event => {
                          setContact(event.target.value);
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={3}>
                      Date of Birth{' '}
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="date"
                        className="note"
                        placeholder="Description"
                        id="myInput6"
                        readOnly
                        value={dob}
                        name="input"
                        onChange={event => {
                          setDOB(event.target.value);
                        }}
                      />
                    </Col>
                  </FormGroup>
                  {/* <FormGroup  row>
                    <Label for="exampleEmail" sm={3}>
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="text"
                        className="note"
                        placeholder="Description"
                        id="myInput7"
                        readOnly
                        name="input"
                        value={email}
                        onChange={event => {
                          setEmail(event.target.value);
                        }}
                      />
                    </Col>
                  </FormGroup> */}
                  <FormGroup check row>
                    <center>
                      <Col sm={{ size: 15 }}>
                        <Button onClick={updateData} color="success">
                          Update
                        </Button>
                      </Col>
                    </center>
                  </FormGroup>{' '}
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </Col>
        <Col lg={5} md={8} sm={8} xs={12}>
          <br></br>
          <Card className="profileInfo">
            {/* <CardHeader>
              {firstName} {secondName}
            </CardHeader> */}
            <CardBody>
              <center>
                <img
                  src={'http://localhost:3001/uploads/profileImages/' + proPic}
                  width="150px"
                  height="150px"
                  className="profileImg"
                />
                <br></br>
                <br></br>
                <h4>
                  {firstName} {secondName}
                </h4>
                <p>{email}</p>
              </center>
              {authState.role != "chartered"&&(
              <center>
              {authState.role == "professional" && eligibility==1 ? (
                <Button color="warning" className="text-dark" onClick={toggle}>
                  <b> Request to be a chartered member </b> <FaCrown className="ml-1 mb-1" />
                </Button>
                ) : (
                <Button color="warning" className="text-dark" onClick={toggle}>
                  <b> Upgrade Membership </b> <FaCrown className="ml-1 mb-1" />
                </Button>
                )}
              </center>
              )}
            </CardBody>
          </Card>
          <br></br>
          <center>{msgPasswords()}</center>
          <>
            <div>
              {!paymentStatus == 0 ? (
                <Card>
                  <center>
                    <br></br>
                    <Typography className="text-success">
                      <h5>
                        <b>Membership Payment Successful</b>
                      </h5>
                      <hr></hr>
                    </Typography>
                    <img
                      src={'http://localhost:3001/uploads/paymentDone.gif'}
                      width="260px"
                      height="200px"
                      className="succesfull"
                    />
                  </center>
                  <br></br>
                </Card>
              ) : (
                <>
                  <Card>
                    <center>
                      <br></br>
                      <Typography className="text-danger">
                        <h5>
                          <b>Membership Payment</b>
                        </h5>
                        <hr></hr>
                      </Typography>
                      <img
                        src={'http://localhost:3001/uploads/pay.gif'}
                        width="260px"
                        height="200px"
                        className="succesfull"
                      />
                    </center>
                    <br></br>
                    <FormGroup check row>
                      <center>
                        <Col sm={{ size: 15 }}>
                          <Button
                            color="warning"
                            onClick={pay}
                            className="text-dark"
                          >
                            Pay Now
                          </Button>
                        </Col>
                      </center>
                    </FormGroup>{' '}
                    <br></br>
                  </Card>
                </>
              )}
            </div>
          </>
          <br></br>
          <Card>
            <CardHeader>Update Login Details</CardHeader>
            <CardBody>
              <FormGroup row>
                <Label for="exampleEmail" sm={6}>
                  Current Password
                </Label>
                <Col sm={6}>
                  <Input
                    className="input"
                    type="password"
                    onChange={e => setCurrentPassword(e.target.value)}
                  ></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={6}>
                  New Password
                </Label>
                <Col sm={6}>
                  <Input
                    className="input"
                    type="password"
                    onChange={event => {
                      setNewPassword(event.target.value);
                    }}
                  ></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={6}>
                  Confirm Password
                </Label>
                <Col sm={6}>
                  <Input
                    className="input"
                    type="password"
                    onChange={event => {
                      setConfirmPassword(event.target.value);
                    }}
                  ></Input>
                </Col>
              </FormGroup>
              <FormGroup check row>
                <center>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={updatePassword} color="danger">
                      Update Password
                    </Button>
                  </Col>
                </center>
              </FormGroup>{' '}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default Profile;
