import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  Settings,
  ExitToApp,
  Notifications,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "react-modern-drawer/dist/index.css";
import { useDeleteUserMutation } from "../redux/userApi";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { AlignJustify, X, BookHeart,House } from "lucide-react";


const Navigation = () => {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const id = useSelector((state) => state.auth.id);
  const role = useSelector((state) => state.auth.role);

  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [toggleOpen, setToggleOpen] = React.useState(false);
  const toggleDrawer = () => {
    setToggleOpen((prevState) => !prevState);
  };

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const moveToProfile = (event) => {
    event.preventDefault();
    navigate(role === "talent" ? "/me" : "/profile");
    toggleDrawer();
  };
  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  const handleDelete = async (event) => {
    event.preventDefault
    try {
      const response = await deleteUser(id).unwrap();
      console.log("Delete response:", response);
    } catch (e) {
      console.log(e);
    }
    navigate("/");
    toggleDrawer();
  };
  const moveToApplications = (event) => {
    event.preventDefault();
    navigate("/applications");
    toggleDrawer();
  };
  const moveToJobsPosted = (event) => {
    event.preventDefault();
    navigate("/jobsPosted");
    toggleDrawer();
  };
  const moveToHome = (event) => {
    event.preventDefault();
    navigate("/");
    toggleDrawer();
  };

  return (
    <>
      <div className="top-0 md:hidden h-16  flex items-center justify-between backdrop-blur-lg bg-gray/50  z-50 fixed w-full flex justify-center">
        <BookHeart className="text-indigo-300/60 ml-2"/>
        <Link to="/">
          <h4 className="text-base font-italic text-white">Talent Finder.</h4>
        </Link>
        {isAuthenticated && (
          <AlignJustify
            className="cursor-pointer mr-3 w-8 h-8 text-white"
            onClick={toggleDrawer}
          />
        )}
        {!isAuthenticated && (
          <Link to="/auth">
            <h1 className="text-base font-italic underline mr-4 text-white/50">Login</h1>
          </Link>
        )}
      </div>
      {/* NavBar  desktop */}
      <div className=" md:fixed hidden md:flex z-50 flex w-full justify-center  top-8">
        <div className="flex rounded-full py-3 px-4 w-fit nav-container backdrop-blur-lg ">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <h1 className="text-white mx-2 cursor-pointer font-weight-100">
              Home
            </h1>
          </NavLink>

          <NavLink to="/talents" className="nav-link" activeClassName="active">
            <h1 className="text-white mx-2 cursor-pointer font-weight-100">
              Talents
            </h1>
          </NavLink>

          <NavLink to="/jobs" className="nav-link" activeClassName="active">
            <h1 className="text-white mx-2 cursor-pointer font-weight-100">
              Jobs
            </h1>
          </NavLink>

          {!isAuthenticated && (
            <NavLink to="/auth" className="nav-link" activeClassName="active">
              <h1 className="text-white mx-2 cursor-pointer font-weight-100">
                Login/SignUp
              </h1>
            </NavLink>
          )}

          {isAuthenticated && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <h1 className="text-white mx-2 cursor-pointer font-weight-100">
                  {" "}
                  Logout
                </h1>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-900">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure LogOut?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-black hover:bg-slate-900 "
                    onClick={handleLogout}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {isAuthenticated && (
            <h1
              className="text-white mx-2 cursor-pointer  font-weight-100"
              onClick={toggleDrawer}
            >
              {toggleOpen ? <AlignJustify /> : <AlignJustify />}
            </h1>
          )}

          <Drawer
            anchor="right"
            open={toggleOpen}
            onClose={toggleDrawer}
            className="custom-drawer w-2/3 md:w-1/3 lg:w-1/4"
          >
            <div className="sidebar-content ">
              <div className="block">

              <X className="h-8 w-8 cursor-pointer "color="white" onClick={toggleDrawer} />
              </div>
              {/* User Profile Section */}
              <div className="profile-section">
                <Avatar
                  alt="User Profile"
                  src="https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2F78529e2ec8eb4a2eb2fb961e04915b0a.png&w=400&q=75"
                  className="avatar"
                />
                <h3 className="username">{username}</h3>
              </div>

              <Divider className="divider" />

              {/* Menu List */}
              <List>
                {/*  profile */}
                <div className="md:hidden block">
                  {isAuthenticated && (
                    <ListItem button onClick={moveToHome}>
                      <ListItemIcon>
                        <House color="white"/>{" "}
                      </ListItemIcon>
                      <ListItemText primary="Home" className="list-text" />
                    </ListItem>
                  )}
                </div>
                <ListItem button onClick={moveToProfile}>
                  <ListItemIcon>
                    <AccountCircle className="icon" />
                  </ListItemIcon>
                  <ListItemText primary="Profile" className="list-text" />
                </ListItem>
                {/* applications */}
                {role === "talent" && (
                  <ListItem button onClick={moveToApplications}>
                    <ListItemIcon>
                      <PermContactCalendarIcon className="icon" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Applications"
                      className="list-text"
                    />
                  </ListItem>
                )}
                {role === "client" && (
                  <ListItem button onClick={moveToJobsPosted}>
                    <ListItemIcon>
                      <PermContactCalendarIcon className="icon" />
                    </ListItemIcon>
                    <ListItemText primary="Jobs Posted" className="list-text" />
                  </ListItem>
                )}

                {/* notifications */}
                <ListItem button onClick={toggleDrawer}>
                  <ListItemIcon>
                    <Notifications className="icon" />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" className="list-text" />
                </ListItem>
                {/* settings */}
                <ListItem button onClick={toggleDrawer}>
                  <ListItemIcon>
                    <ManageAccountsIcon className="icon" />
                  </ListItemIcon>
                  <ListItemText primary="Settings" className="list-text" />
                </ListItem>
                {/* delete account */}
                <ListItem button onClick={handleDelete}>
                  <ListItemIcon>
                    <DeleteForeverIcon className="icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Delete Account"
                    className="list-text"
                  />
                </ListItem>

                {/* logout */}
                <ListItem
                  button
                  onClick={() => {
                    handleLogout();
                    toggleDrawer();
                  }}
                >
                  <ListItemIcon>
                    <ExitToApp className="icon" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" className="list-text" />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Navigation;
