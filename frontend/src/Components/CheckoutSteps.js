import { Step, Stepper, Typography } from "@material-tailwind/react";
import { set } from "mongoose";
import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const CheckoutSteps = ({ step1, step2, step3 }) => {
  const [activeStep, setActiveStep] = React.useState(0);
 
  useEffect(() => {
    if (step1 && !step2 && !step3) {
      setActiveStep(3);
    } else if (step1 && step2 && !step3) {
      setActiveStep(1);
    } else if (step1 && step2 && step3) {
      setActiveStep(2);
    } else if (step1 && step2 && step3) {
      setActiveStep(3);
    }
  }, [step1, step2, step3]);

  return (
    <>
      <div className="w-full px-24 py-4 mb-4">
        <Stepper
          activeStep={activeStep}
         
        >
          <Step>
            <FaCheck className="text-white" />
            <div className="absolute -bottom-[3rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Sign in
                <br />
              </Typography>
            </div>
          </Step>

          <Step>
            <FaCheck className="text-white" />
            <div className="absolute -bottom-[3rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Shipping
                <br />
              </Typography>
            </div>
          </Step>

          <Step>
            <FaCheck className="text-white" />
            <div className="absolute -bottom-[3rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                PlaceOrder
                <br />
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {/* {step1 ? (
            <Nav.Link as={Link} to="/login">
              {" "}
              Sign In
            </Nav.Link>
          ) : (
            <Nav.Link disabled> Sign In</Nav.Link>
          )} */}
        </Nav.Item>

        <Nav.Item>
          {/* {step2 ? (
            <Nav.Link as={Link} to="/shipping">
              {" "}
              Shipping
            </Nav.Link>
          ) : (
            <Nav.Link disabled> Shipping</Nav.Link>
          )} */}
        </Nav.Item>
        <Nav.Item>
          {/* {step3 ? (
            <Nav.Link as={Link} to="/payment">
              {" "}
              Payment
            </Nav.Link>
          ) : (
            <Nav.Link disabled> Payment</Nav.Link>
          )} */}
        </Nav.Item>
        <Nav.Item>
          {/* {step4 ? (
            <Nav.Link as={Link} to="/placeOrder">
              {" "}
              PlaceOrder
            </Nav.Link>
          ) : (
            <Nav.Link disabled>PlaceOrder</Nav.Link>
          )} */}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CheckoutSteps;
