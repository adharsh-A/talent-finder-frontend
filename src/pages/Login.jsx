import React, { useState, useEffect, act } from "react";
import { Label } from "../components/ui/label";


import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useLoginMutation, useRegisterMutation } from "../redux/authentication";
import { setCredentials } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import "./Login.css";
import {toast} from "sonner"
import { occupations } from "./UserDetails";

export function Login() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState("talent");

  const [
    login,
    { isLoading: isLoggingIn, isError: isLoginError, error: loginError },
  ] = useLoginMutation();
  const [
    register,
    {
      isLoading: isRegistering,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    userType: "talent",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, userType }));
  }, [userType]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (isRegister) {
      if (!formData.firstname) newErrors.firstname = "First name is required.";
      if (!formData.lastname) newErrors.lastname = "Last name is required.";
      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid.";
      }
      if (formData.password !== formData.repeatPassword) {
        newErrors.repeatPassword = "Passwords do not match.";
      }
    }
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        let result;
        if (isRegister) {
          result = await register({
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            role: formData.userType,
          }).unwrap();
        } else {
          result = await login({
            username: formData.username,
            password: formData.password,
          }).unwrap();
        }

        dispatch(
          setCredentials({
            token: result.token,
            username: result.username,
            id: result.id,
            role: result.role,
          })
        );

        toast(
          `hello ${result.username}`, {
            description: `Date: ${new Date()}`,
          }
        )

        if (result.role === "talent") {
          navigate(isRegister ? "/talent-data" :navigate(-1));
        } else {
          navigate(isRegister ? "/client-data" : navigate(-1));
        }
      } catch (err) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        console.error(
          isRegister ? "Registration failed:" : "Login failed:",
          err
        );
        toast.error(
          err.data?.message || "An error occurred. Please try again."
        );
      }
    } else {
      setErrors(formErrors);
    }
  };

  const toggleAuthForm = () => {
    setIsRegister((prev) => !prev);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });

  };
  

  return (
    <>
      <div className={` mt-28 ${isRegister ? "md:max-w-3xl" : "md:max-w-2xl"}  md:w-full md:mx-auto mx-4 md:border-[2px]  md:rounded-2xl p-4 md:p-8 shadow-2xl  md:dark:bg-zinc-950 md:border-zinc-700/80 md:border-2 transition duration-300 animate ease-in-out`}>
        <h2 className="font-bold text-2xl md:text-3xl text-white dark:text-neutral-200">
          {isRegister ? "Register" : "Login"}
        </h2>
        <p className="text-white text-sm md:text-base max-w-sm mt-2 dark:text-neutral-300/80">
          {isRegister ? "Sign up for Talent-Finder" : "Login to Talent-Finder"}
        </p>
        <button
          className="mt-2 text-white text-sm md:text-base underline"
          onClick={toggleAuthForm}
        >
          {isRegister
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </button>
        <form className="my-8 space-y-4 " onSubmit={handleSubmit}>
          {isRegister && (
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={errors.firstname && "border-red-500"}
                />
                {errors.firstname && (
                  <p className="text-red-500">{errors.firstname}</p>
                )}
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={errors.lastname && "border-red-500"}
                  />
                {errors.lastname && (
                  <p className="text-red-500">{errors.lastname}</p>
                )}
              </LabelInputContainer>
            </div>
          )}

          {isRegister && (
            <LabelInputContainer className="md:mb-4 mb-0">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email && "border-red-500"}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </LabelInputContainer>
          )}

          <LabelInputContainer className="md:mb-4 mb-0">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="projectmayhem@fc.com"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username && "border-red-500"}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="md:mb-4 mb-0">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password && "border-red-500"}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </LabelInputContainer>

          {isRegister && (
            <>
              <LabelInputContainer className="mb-8">
                <Label htmlFor="repeatpassword">Repeat Password</Label>
                <Input
                  id="repeatPassword"
                  placeholder="••••••••"
                  type="password"
                  value={formData.repeatPassword}
                  onChange={handleInputChange}
                  className={errors.repeatPassword && "border-red-500"}
                />
                {errors.repeatPassword && (
                  <p className="text-red-500">{errors.repeatPassword}</p>
                )}
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
            className={`login-button px-4 py-2 rounded-md ${isLoggingIn || isRegistering ? "bg-neutral-300/50 cursor-progress text-black border border-white/10" : ""} ${
              isLoggingIn || isRegistering ? "disabled" : ""
            }`}
            type="submit"
            disabled={isLoggingIn || isRegistering}
          >
            {isLoggingIn || isRegistering
              ? "Processing..."
              : isRegister
              ? "Sign up"
              : "Log in"}{" "}
            &rarr;
          </button>
          {(isLoginError || isRegisterError) && (
            <p className="text-red-500">
              {loginError?.data?.message ||
                registerError?.data?.message ||
                "An error occurred"}
            </p>
          )}
        </form>

        <p className="md:mt-10 -mt-4 text-sm text-neutral-400">
          By clicking Sign up, you agree to our Terms of Service and Privacy
          Policy.
        </p>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGithub className="md:h-6 md:w-6 w-4 h-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative text-neutral-700 align-middle group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="md:h-7 md:w-7 w-4 h-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </div>
    </>
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
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
