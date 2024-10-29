import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spotlight } from "../components/ui/Spotlight.jsx";
import { TalentData } from "../pages/TalentData.jsx";
import { VelocityScroll } from "../components/ui/scroll-based-velocity.jsx";
import { TextRevealDemo } from "@/components/Text.jsx";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useSelector } from "react-redux";
import { ArrowUpFromLine } from "lucide-react";
import { Vortex } from "@/components/ui/vortex.jsx";

const Home = (props) => {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role)||"talent";
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <div className="h-[35rem] items-center  md:h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="md:hidden block absolute top-0 left-0 w-full h-full">
          <Vortex />
        </div>
        <div className="hidden md:block">

        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
          />
          </div>
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="leading-[1.15]  pt-12  md:mt-0 md:leading-[1.3] text-3xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Find the Perfect Match <br /> Talents and Clients United.{" "}
          </h1>
          <p className="indent-4 mt-4 font-normal text-base text-neutral-300 md:max-w-lg hidden md:block text-justify mx-auto">
            Talent Finder is a cutting-edge platform designed to connect talented individuals with clients seeking their services. With a focus on efficiency, security, and scalability, Talent Finder offers a seamless experience for both clients and talents.
          </p>
          <p className="indent-4 mt-4 font-normal text-base text-neutral-300 md:max-w-lg block md:hidden text-sm text-center mx-auto">
            The platform features robust user authentication, real-time job posting management, and advanced search capabilities, all built with security and scalability in mind.{" "}
          </p>
          <div className="flex flex-col justify-center items-center mt-4 md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            {role === "client" && (
              <Link to="talents">
                <button className="relative inline-flex h-8 md:h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
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
                <button className="relative inline-flex h-8 md:h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      <div className=" flex"><ArrowUpFromLine className="w-4 h-4 mr-2"/>Create Job</div>
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
      <TextRevealDemo text="Talent Finds Purpose, Companies Find Excellence™.🎉" />

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
