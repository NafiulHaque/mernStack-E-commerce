import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import {
  userDetailsAction,
  userProfileUpdateAction,
} from "../actions/userAction";

import { Card, Button, CardBody, CardFooter } from "@material-tailwind/react";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // console.log("user--------",user)

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(userDetailsAction("profile"));
    }
  }, [userInfo, navigate, dispatch]);

  return (
    <Card>
      <CardBody>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-2 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              
            </div>
            <div className="border-t border-gray-200 px-4 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.name}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    +88
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    123 Main St
                    <br />
                    Anytown, USA 12345
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </CardBody>
      <CardFooter>
        <Button onClick={() => navigate("/user/dashboard/editprofile")}>
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileScreen;
