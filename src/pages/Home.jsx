import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spotlight } from "../components/ui/Spotlight.jsx";
import { TalentData } from "../pages/TalentData.jsx";
import { VelocityScroll } from "../components/ui/scroll-based-velocity.jsx";
import { TextRevealDemo } from "@/components/Text.jsx";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useSelector } from "react-redux";

const Home = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role)||"talent";
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Find the Perfect Match <br /> Talents and Clients United.{" "}
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Talent Finder is a user-friendly platform that connects skilled
            professionals with clients. The responsive frontend enables easy
            sign-up, login, profile management, and talent search based on
            skills, location, and experience across any device.{" "}
          </p>
          <div className="flex flex-col justify-center items-center mt-4 md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            {role === "client" && (
              <Link to="talents">
                <button className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    See Talents
                  </span>
                </button>
              </Link>
            )}

            {role !== "client" && (
              <Link to="/jobs">
                <RainbowButton>See All Jobs</RainbowButton>
              </Link>
            )}

            {role === "client" && (
              <Link to="create">
                <button className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                      <div className="ml-2">Create Job</div>
                  </span>
                </button>
              </Link>
            )}

            <Link to="/auth">
              {!isAuthenticated && <RainbowButton>Sign Up</RainbowButton>}
            </Link>
          </div>
        </div>
      </div>
      <TextRevealDemo text="Connecting Talent with Opportunity, Seamlessly.🎉" />

      <TalentData />
      {/* <MarqueeCards/> */}
      <VelocityScroll
        text="Find the Perfect Match"
        default_velocity={1}
        className=" font-display text-center text-5xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
      />

      {/* <Footer /> */}
    </>
  );
};

export default Home;
