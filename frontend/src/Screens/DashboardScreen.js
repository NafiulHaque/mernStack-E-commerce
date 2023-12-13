import React from "react";
import Sidebar from "../Components/sidebar/Sidebar";
import { Outlet, Route, Routes } from "react-router-dom";
import UserEditScreen from "./UserEditScreen";
import ProductListScreen from "./ProductListScreen";
import ProductEditScreen from "./ProductEditScreen";
import OrderListScreen from "./OrderListScreen";
import UserListScreen from "./UserListScreen";

const DashboardScreen = () => {
  return (
    <div className="grid grid-rows-1 grid-flow-col grid-cols-12">
      <div className="row-span-1 col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-9 px-4">
          <Outlet/>
      </div>
    </div>
  );
};

export default DashboardScreen;
