import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_PROFILE_RESET } from "../Constants/UserConstant";
import {
  userDetailsAction,
  userProfileUpdateAction,
} from "../actions/userAction";
import { RxAvatar } from "react-icons/rx";

const ProfileEditScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [divition, setDivition] = useState("");
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
        setPhoneNumber(user ? user.phoneNumber : "");
        setCity(user ? user.city : "");
        setDivition(user ? user.divition : "");
        setAddress(user ? user.address : "");
        setImage(user ? user.image : "");
      }
    }
  }, [userInfo, navigate, user, success, dispatch]);

  const handleFileUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (email !== "" && name !== "") {
      dispatch(
        userProfileUpdateAction({
          id: user._id,
          name,
          email,
          image,
          address,
          phoneNumber,
          city,
          divition,
        })
      );
      navigate("/user/dashboard");
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

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-blue-gray-600 dark:text-gray-200"
                for="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            {/* <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group> */}

            <div>
              <label
                className="text-blue-gray-600 dark:text-gray-200"
                for="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-blue-gray-600 dark:text-gray-200"
                for="phoneNumber"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-blue-gray-600 dark:text-gray-200"
                for="city"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-blue-gray-600 dark:text-gray-200"
                for="divition"
              >
                Divition
              </label>
              <input
                id="divition"
                type="text"
                value={divition}
                onChange={(e) => setDivition(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-blue-gray-600 dark:text-gray-200"
                for="address"
              >
                Address
              </label>
              <textarea
                id="address"
                type="textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>

            <div>
              <label
                className="text-blue-gray-600 dark:text-gray-200"
                for="countInStock"
              >
                Count In Stock
              </label>
              <input
                id="countInStock"
                type="file"
                onChange={handleFileUpload}
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div className="flex items-center mx-auto">
              <span className="inline-block h-14 w-14 rounded-full border my-3 overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="product"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="w-14 h-14 " />
                )}
              </span>
            </div>
          </div>

          <Button size="md" type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProfileEditScreen;
