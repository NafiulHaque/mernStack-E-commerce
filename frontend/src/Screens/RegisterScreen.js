import { React, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Message from "../Components/Message";
import FormContainer from "../Components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { Login, RegisterAction } from "../actions/userAction";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
console.log("name:", name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/");
  //   }
  // }, []);

  const submitHandler = (e) => {

    e.preventDefault();
    if(email !=="" && password !=="" && name !=="" && confirmPassword !==""){
        if(password != confirmPassword){
            setMessage("password do not match")
        }else{
               dispatch(RegisterAction(name,email, password));
               navigate("/");
    }
      }

  
  };

  

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant={"danger"}>{message}</Message>}
      {error && <Message variant={"danger"}>{error}</Message>}
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

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have you an account?
          <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
