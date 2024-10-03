import React from "react";
import {NavLink } from "react-router-dom";
import "./Navigation.css"
import { useSelector } from "react-redux";
import { IconH2 } from "@tabler/icons-react";

const Navigation = (props) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="z-10 absolute flex w-full justify-center inset-x-0 top-5 ">
      <div className="flex  rounded-full  p-5 w-fit nav-container">

        <NavLink to="/" className="nav-link" activeClassName="active">
        <h1 className="text-white mx-4" >Home</h1>
        </NavLink>

        <NavLink to="/talents" className="nav-link" activeClassName="active">
        <h1 className="text-white mx-4" >Talents</h1>
        </NavLink>

        <NavLink to="/auth" className="nav-link" activeClassName="active">
        <h1 className="text-white mx-4" >Login/SignUp</h1>
        </NavLink>
        {isAuthenticated && <h1 className="text-white mx-4 font-bold-semibold" onClick={handleLogout}>logout</h1>}

      </div>
    </div>
  );
};

export default Navigation;
