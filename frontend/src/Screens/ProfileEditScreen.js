import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_PROFILE_RESET } from "../Constants/UserConstant";
import {
  userDetailsAction,
  userProfileUpdateAction,
} from "../actions/userAction";

const ProfileEditScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate = useSelector((state) => state.userUpdateProfile);
  const { success } = userProfileUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if ((user && !user.name) || success) {
        dispatch({
          type: USER_PROFILE_RESET,
        });
        dispatch(userDetailsAction("profile"));
      } else {
        setName(user ? user.name : "");
        setEmail(user ? user.email : "");
      }
    }
  }, [userInfo, navigate, user, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      email !== "" &&
      password !== "" &&
      name !== "" &&
      confirmPassword !== ""
    ) {
      if (password !== confirmPassword) {
        setMessage("password do not match");
      } else {
        dispatch(
          userProfileUpdateAction({ id: user._id, name, email, password })
        );
        navigate("/user/dashboard");
      }
    }
  };

  return (
    <Card className="mt-4">
        
        <h3 className="mt-3 mx-3">Edit User Profile</h3>
      <CardBody>
        {message && <Message variant={"danger"}>{message}</Message>}
        {error && <Message variant={"danger"}>{error}</Message>}
        {success && <Message variant={"success"}>Profile Updated</Message>}

        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Button size="md" type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ProfileEditScreen;
