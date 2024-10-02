import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { useNavigate } from "react-router";
export function Login() {
  const navigate = useNavigate();
  // State to toggle between 'Register' and 'Login'
  const [isRegister, setIsRegister] = useState(true);
  const [userType, setUserType] = useState("talent"); // State to store user type (Talent or Client)

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/talent-data");
  };

  const toggleAuthForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="mt-28 max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black/[0.96]">
      <h2 className="font-bold text-xl text-white dark:text-neutral-200">
        {isRegister ? "Register" : "Login"}
      </h2>
      <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
        {isRegister ? "Sign up for Talent-Finder" : "Login to Talent-Finder"}
      </p>
      <button
        className="mt-2 text-white text-sm underline"
        onClick={toggleAuthForm}
      >
        {isRegister ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </button>
      <form className="my-8" onSubmit={handleSubmit}>
        {isRegister && (
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Durden" type="text" />
            </LabelInputContainer>
          </div>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        {isRegister && (
          <>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Repeat Password</Label>
              <Input id="repeatpassword" placeholder="••••••••" type="password" />
            </LabelInputContainer>

            <div className="mb-8">
              <Label htmlFor="usertype">Sign up as</Label>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="usertype"
                    value="talent"
                    checked={userType === "talent"}
                    onChange={() => setUserType("talent")}
                    className="form-radio"
                  />
                  <span className="text-white">Talent</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="usertype"
                    value="client"
                    checked={userType === "client"}
                    onChange={() => setUserType("client")}
                    className="form-radio"
                  />
                  <span className="text-white">Client</span>
                </label>
              </div>
            </div>
          </>
        )}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {isRegister ? "Sign up" : "Log in"} &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
            <BottomGradient />
          </button>

        </div>
      </form>

      <button
        className="mt-4 text-white text-sm underline"
        onClick={toggleAuthForm}
      >
        {isRegister ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
