import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import {
  AiFillDashboard,
  AiOutlineAppstoreAdd,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="p-4">
          <Typography variant="h5" color="blue-gray">
            Dashboard
          </Typography>
          <hr className=" border-blue-gray-50" />
        </div>
        <List>
          <Link to="/dashboard/productlist" className="no-underline">
            <ListItem>
              <ListItemPrefix>
                <AiOutlineAppstoreAdd className="h-5 w-5" />
              </ListItemPrefix>
              Products
            </ListItem>
          </Link>

          <Link to="/dashboard/userlist" className="no-underline">
            <ListItem>
              <ListItemPrefix>
                <AiOutlineUsergroupAdd className="h-5 w-5" />
              </ListItemPrefix>
              Users
            </ListItem>
          </Link>
          <Link to="/dashboard/orderlist" className="no-underline">
            <ListItem>
              <ListItemPrefix>
                <IoBagCheckOutline className="h-5 w-5" />
              </ListItemPrefix>
              Orders
            </ListItem>
          </Link>
        </List>
      </Card>
    </>
  );
};

export default Sidebar;
