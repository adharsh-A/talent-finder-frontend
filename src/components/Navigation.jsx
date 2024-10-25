import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
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
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { AccountCircle, Settings, ExitToApp, Notifications } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import 'react-modern-drawer/dist/index.css'
import {useDeleteUserMutation} from '../redux/userApi';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const id = useSelector((state) => state.auth.id);
  const role = useSelector((state) => state.auth.role);


  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [toggleOpen, setToggleOpen] = React.useState(false)
  const toggleDrawer = () => {
      setToggleOpen((prevState) => !prevState)
  }

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();


  const moveToProfile = () => {

    navigate(role === "talent" ? "/me" : "/profile");
    toggleDrawer();
  }
  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  const handleDelete=async()=>{
try{
  const response = await deleteUser(id).unwrap()
  console.log('Delete response:', response)

}catch(e){
  console.log(e)
}
    navigate('/')
    toggleDrawer()
  }
  const moveToApplications = () => {
    navigate("/applications");
    toggleDrawer();
  }
  const moveToJobsPosted = () => {
    navigate("/jobsPosted");
    toggleDrawer();
  }


  return (
    <>

      {/* NavBar */}
      <div className=" fixed hidden md:flex z-50 flex w-full justify-center  top-5">
        <div className="flex rounded-full p-5 w-fit nav-container">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <h1 className="text-white mx-2 cursor-pointer font-weight-100">Home</h1>
          </NavLink>

          <NavLink to="/talents" className="nav-link" activeClassName="active">
            <h1 className="text-white mx-2 cursor-pointer font-weight-100">Talents</h1>
          </NavLink>

          <NavLink to="/jobs" className="nav-link" activeClassName="active">
            <h1 className="text-white mx-2 cursor-pointer font-weight-100">Jobs</h1>
          </NavLink>

          {!isAuthenticated && (
            <NavLink to="/auth" className="nav-link" activeClassName="active">
              <h1 className="text-white mx-2 cursor-pointer font-weight-100">Login/SignUp</h1>
            </NavLink>
          )}

          {isAuthenticated && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <h1 className="text-white mx-2 cursor-pointer font-weight-100"> Logout</h1>
              </AlertDialogTrigger>
              <AlertDialogContent  className="bg-slate-900">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure LogOut?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-black hover:bg-slate-900 " onClick={handleLogout}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
                    {isAuthenticated && (
              <h1 className="text-white mx-2 cursor-pointer  font-weight-100" onClick={toggleDrawer}>Menu</h1>
          )}

    <Drawer
      anchor="right"
      open={toggleOpen}
      onClose={toggleDrawer}
      className='custom-drawer'
    >
      <div className="sidebar-content">
        {/* User Profile Section */}
        <div className="profile-section">
          <Avatar alt="User Profile" src="https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2F78529e2ec8eb4a2eb2fb961e04915b0a.png&w=400&q=75" className="avatar" />
          <h3 className="username">{username}</h3>
        </div>

        <Divider className="divider" />

        {/* Menu List */}
        <List>
         {/*  profile */}
          <ListItem button onClick={moveToProfile}>
            <ListItemIcon>
              <AccountCircle className="icon" />
            </ListItemIcon>
            <ListItemText primary="Profile" className="list-text" />
          </ListItem>
              {/* applications */}
{role==="talent" &&          <ListItem button onClick={moveToApplications}>
            <ListItemIcon>
              <PermContactCalendarIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Applications" className="list-text" />
                </ListItem>}
{role==="client" &&          <ListItem button onClick={moveToJobsPosted}>
            <ListItemIcon>
              <PermContactCalendarIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Jobs Posted" className="list-text" />
                </ListItem>}
                
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
            <ListItemText primary="Delete Account" className="list-text" />
          </ListItem>


          {/* logout */}
          <ListItem button onClick={() => {handleLogout()
            toggleDrawer()
          }}>
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
