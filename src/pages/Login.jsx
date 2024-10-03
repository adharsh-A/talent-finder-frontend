import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useLoginMutation, useRegisterMutation } from "../redux/authentication";
import { setCredentials } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [userType, setUserType] = useState("talent");

  const dispatch = useDispatch();
  
  // useLoginMutation and useRegisterMutation hooks
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  // State to store all form inputs
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    userType: `${userType}`,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (isRegister) {
      if (!formData.firstname) newErrors.firstname = "First name is required.";
      if (!formData.lastname) newErrors.lastname = "Last name is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    if (isRegister && formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (isRegister) {
        // Call the register mutation
        try {
          const { data } = await register({
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            role: formData.userType,
          }).unwrap();
          console.log("API response data:", data);


          console.log("Registration successful:", data);
          dispatch(setCredentials({ token: data.token, username: data.username,id: data.user.id,role: data.user.role }));
          navigate("/talent-data");
        } 
        catch (err) {
          toast.error("Invalid username or password");
          console.error("registration failed:", err);
        }
      } else {
        // Call the login mutation
        try {
          const senddata = {
            username: formData.username,
            password: formData.password,
          }
          const { data } = await login(senddata).unwrap();
          console.log("API response data:", data);


          dispatch(setCredentials({ token: data.token, username: data.username,id: data.user.id,role: data.user.role }))
          navigate("/");
        } catch (err) {
          toast.error("Invalid username or password");
          console.error("Login failed:", err);
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  const toggleAuthForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <>
    <div className="mt-28 max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-100 dark:bg-zinc-900 bg/[0.96]">
      <h2 className="font-bold text-xl text-white dark:text-neutral-200">
        {isRegister ? "Register" : "Login"}
      </h2>
      <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
        {isRegister ? "Sign up for Talent-Finder" : "Login to Talent-Finder"}
      </p>
      <button className="mt-2 text-white text-sm underline" onClick={toggleAuthForm}>
        {isRegister ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </button>
      <form className="my-8" onSubmit={handleSubmit}>
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
              {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
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
              {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
            </LabelInputContainer>
          </div>
        )}

{isRegister &&        <LabelInputContainer className="mb-4">
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
        </LabelInputContainer>}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="projectmayhem@fc.com"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username && "border-red-500"}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password && "border-red-500"}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
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
              {errors.repeatPassword && <p className="text-red-500">{errors.repeatPassword}</p>}
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
          className="login-button"
          type="submit"
        >
          {isRegister ? "Sign up" : "Log in"} &rarr;
        </button>
        {isError && <p>Error: {error?.data?.message || 'Login failed'}</p>}
        {isSuccess && <p>Login successful!</p>}
        

 </form>

      <p className="mt-10 text-xs text-neutral-400">
        By clicking Sign up, you agree to our Terms of Service and Privacy Policy.
      </p>
      
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
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};