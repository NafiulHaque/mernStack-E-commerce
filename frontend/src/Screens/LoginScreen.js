import { React, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Message from "../Components/Message";
import FormContainer from "../Components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { Login } from "../actions/userAction";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  console.log("userInfo:", userInfo);



  const submitHandler = (e) => {
    e.preventDefault();
    if(email !=="" && password !==""){

        dispatch(Login(email, password));
        navigate("/"); 
      }
    
 
  };



  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant={"danger"}>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Link to="/signup">     <Row className="py-3">
        <Col>
          New Customer?

          Register

        </Col>
      </Row></Link>
    </FormContainer>
  );
};

export default LoginScreen;
