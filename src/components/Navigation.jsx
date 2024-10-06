import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogOverlay, // Added Overlay for modal effect
} from "@radix-ui/react-alert-dialog";
import { Flex, Button } from "@radix-ui/themes";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false); // Close the dialog after logout
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {/* NavBar */}
      <div className="z-10 absolute flex w-full justify-center inset-x-0 top-5">
        <div className="flex rounded-full p-5 w-fit nav-container">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <h1 className="text-white mx-4">Home</h1>
          </NavLink>

          <NavLink to="/talents" className="nav-link" activeClassName="active">
            <h1 className="text-white mx-4">Talents</h1>
          </NavLink>

          {!isAuthenticated && (
            <NavLink to="/auth" className="nav-link" activeClassName="active">
              <h1 className="text-white mx-4">Login/SignUp</h1>
            </NavLink>
          )}

          {isAuthenticated && (
            <h1
              className="text-white mx-4 font-bold-semibold cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Logout
            </h1>
          )}
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-40" /> {/* Overlay to dim background */}
        <AlertDialogContent className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-5 shadow-lg max-w-xs w-full">
          <AlertDialogTitle className="text-lg font-bold text-black antialiased">Revoke Access</AlertDialogTitle>
          <AlertDialogDescription className="text-sm mt-2 text-black antialiased">
            Are you sure you want to log out? This will revoke access and end your current session.
          </AlertDialogDescription>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialogCancel asChild>
            <Button
  variant="soft"
  color="gray"
  style={{
    backgroundColor: "#f3f4f6", // Light gray background color
    color: "#4b5563", // Gray text color
    padding: "8px 16px", // Padding to match `px-4`
    borderRadius: "6px", // To match `rounded-md`
    fontSize: "14px", // To match `text-sm`
    fontWeight: "500" // To match `font-medium`
  }}
  className="pointer"
  onClick={() => setIsOpen(false)}
>
  Cancel
</Button>

            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button  className="pointer rounded-md text-sm font-medium px-4" variant="solid" color="red" onClick={handleLogout}>
                Logout
              </Button>
            </AlertDialogAction>
          </Flex>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Navigation;
