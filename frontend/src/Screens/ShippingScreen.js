import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Card, CardBody } from "@material-tailwind/react";

const ShipingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  console.log(address);

  const submitHandler = (e) => {
    console.log({ address, city, postalCode, country });
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/placeOrder");
  };

  return (
    <Card>
      <CardBody>
        <CheckoutSteps step1 step2 />
        <h1>Shipping Details </h1>

        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Confirm password"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ShipingScreen;
