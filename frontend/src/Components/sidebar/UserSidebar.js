import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import {
    AiFillCar,
  AiFillCaretUp,
  AiFillProfile,
  AiOutlineAppstoreAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4">
        <Typography variant="h5" color="blue-gray">
          Dashboard
        </Typography>
        <hr className=" border-blue-gray-50" />
      </div>
      <List>
        <Link to="/user/dashboard" className="no-underline">
          <ListItem>
            <ListItemPrefix>
              <AiOutlineUser className="h-5 w-5" />
            </ListItemPrefix>
            User Profile
          </ListItem>
        </Link>

        <Link to="/user/dashboard/userorder" className="no-underline">
          <ListItem>
            <ListItemPrefix>
              <AiOutlineShoppingCart className="h-5 w-5" />
            </ListItemPrefix>
            My Orders
          </ListItem>
        </Link>
        <Link to="/user/dashboard/wishlist" className="no-underline">
          <ListItem>
            <ListItemPrefix>
              <IoBagCheckOutline className="h-5 w-5" />
            </ListItemPrefix>
            Wish List
          </ListItem>
        </Link>
      </List>
    </Card>
  );
};

export default UserSidebar;
