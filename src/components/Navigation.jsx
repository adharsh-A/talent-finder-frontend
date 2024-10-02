import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css"

const Navigation = (props) => {
  return (
    <div className="z-10 absolute flex w-full justify-center inset-x-0 top-5 ">
      <div className="flex  rounded-full  p-5 w-fit nav-container">
        <Link to="/">
        <h1 className="text-white mx-2" >Home</h1>
        </Link>
        <Link to="/talents">
        <h1 className="text-white mx-2" >Talents</h1>
        </Link>
        <Link to="/">
        <h1 className="text-white mx-2" >Home</h1>
        </Link>
        <Link to="/auth">
        <h1 className="text-white mx-2" >Login/SignUp</h1>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
