import React, { useState } from "react";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../actions/userAction";
import SearchBox from "./SearchBox";
import { FaChevronDown, FaUser } from "react-icons/fa";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
  Input,
  Badge,
} from "@material-tailwind/react";
import { RxChevronDown, rxcart, RxDashboard } from "react-icons/rx";
import { IoCartOutline } from "react-icons/io5";
// import { hidden } from "colors";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const toggleClass = open ? "" : "hidden";

  const dispatch = useDispatch();
  const navigate =useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  let sum = 0;
  const qtys=cartItems
    .map((e) => e.qty);
    
    
    qtys.forEach((v) => {
      sum += v;
    })

  console.log("sum",sum)

  const logoutHandler = () => {
    dispatch(userLogout());
    navigate("/login")
  };
  return (
    <header>
      <Navbar
        variant="gradient"
        color="blue-gray"
        className=" py-3 max-w-full rounded-none from-blue-gray-900 to-blue-gray-800"
      >
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
            <Link
              to="/"
              className="no-underline hover:shadow-md text-white text-4xl mr-4 ml-2 cursor-pointer py-1.5"
            >
              E-SHOP
            </Link>

            <SearchBox />
            {userInfo && userInfo.isAdmin && (
              <Link to="/dashboard">
                <Button
                  className="mx-2"
                  color="white"
                  variant="outlined"
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>
            )}
            <Link to="/cart" className="text-white mr-2">
              <Badge
                content={sum}
                color="blue-gray"
                withBorder
              >
                <IoCartOutline className="text-4xl mr-2" />
              </Badge>
            </Link>

            {userInfo ? (
              <Menu open={open} handler={handleOpen} placement="bottom-end">
                <MenuHandler>
                  <Button
                    value="text"
                    color="gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
                  >
                    <Avatar
                      variant="circular"
                      size="sm"
                      alt="avatar"
                      className="border-2 border-gray-900 p-0.5"
                      src="https://res.cloudinary.com/dackyi7oq/image/upload/v1702312352/avatars/avatar_osrdwm.png"
                    />
                    <RxChevronDown
                      strokeWidth={2.5}
                      className={`h-3 w-3 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className="p-1">
                  <h5 className="mx-2 mt-2">{userInfo.name}</h5>
                  <Link to="/user/dashboard" className="font-sm no-underline">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link to="/user/dashboard/userorder" className="font-sm no-underline">
                    <MenuItem>My Orders</MenuItem>
                  </Link>
                  <Link to="/user/dashboard/wishlist" className="font-sm no-underline">
                    <MenuItem>Wish List</MenuItem>
                  </Link>

                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link to="/login">
                <Button
                  className="mx-2"
                  color="white"
                  variant="outlined"
                  size="sm"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
