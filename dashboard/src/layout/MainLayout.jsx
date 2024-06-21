import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
