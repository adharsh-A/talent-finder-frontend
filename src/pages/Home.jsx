import React from "react";
import { Link } from "react-router-dom";
import { Spotlight } from "../components/ui/Spotlight.jsx";
import {Talents} from "../components/Talents.jsx"

const Home = (props) => {
  return (<>
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Find the Perfect Match <br /> Talents and Clients United.             </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
        Talent Finder is a user-friendly platform that connects skilled professionals with clients. The responsive frontend enables easy sign-up, login, profile management, and talent search based on skills, location, and experience across any device.        </p>
        <div className="flex flex-col justify-center items-center mt-4 md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Link to="talents">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
See Talents        </button>
          </Link>
        <Link to="/auth">
        <button  className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
        </Link>
      </div>
      </div>
      
    </div>
    <Talents/>
  </>
  );
};

export default Home;
