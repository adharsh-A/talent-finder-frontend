import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css"

const Navigation = (props) => {
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

      </div>
    </div>
  );
};

export default Navigation;
