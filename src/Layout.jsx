import React from "react";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <div className="fixed w-full top-0 z-50">
        <Header />
      </div>
      <div className="p-20">
        <Outlet />
      </div>
    </div>
  );
}
