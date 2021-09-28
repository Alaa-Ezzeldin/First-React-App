import './App.css';
import React, { useState } from 'react';
import LoginControl from './modules/login/login';
import Length from './components/Length/length'
import * as cookieHandler from './shared/cookieHandler'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from "./shared/assets/wubba-lubba-dub-dub.png"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from './modules/home/home';
import Post from './modules/post/post';
import { Menu, MenuItem, Divider } from '@material-ui/core';
import StarWars from './modules/starWars/starWars';
import Posts from './modules/post/posts';
import AuthGuard from './shared/authGuard';
import Error from './shared/assets/components/error';
import Admin from './modules/admin/admin';
import AdminGuard from './shared/adminGuard';

export default function App() {

  function getUserData() {
    const data = cookieHandler.getUserDataFromCookies();
    setUser({
      authenticated: data.authenticated ? data.authenticated : false,
      username: data.username ?? null,
      email: data.email ? data.email : null
    });
  }

  const [user, setUser] = useState(
    {
      authenticated: null,
      username: null,
      email: null
    }
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    cookieHandler.logoutFromCookie();
    getUserData();
  }

  // function adminPanelLink() {
  //   if (user.email) {
  //     console.log("RRERERE", user.email)
  //     return (<Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className="toolbar-link-title">
  //       <Link to="/admin"> Admin Panel</Link>
  //     </Typography>)
  //   }
  //   else {
  //     return null
  //   }
  // }
  return (
    // <div className="App">
    //   <h1>
    //     Hello World!
    //   </h1>
    //   <p>this is actually working ..!!</p>
    //   <Person name="Eren"/>
    // </div>

    <div>
      {
        user.authenticated === null ? getUserData() : user.authenticated ?
          <div>
            <div>
              <AppBar position="sticky" id="navbar">
                <Toolbar id="toolbar">
                  <div>
                    <Link to="/">
                      <img src={logo} id="logo" alt="#" />
                    </Link>
                  </div>
                  <div className="toolbar-links">
                    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className="toolbar-link-title">
                      <Link to="/">Home</Link>
                    </Typography>

                    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className="toolbar-link-title">
                      <Link to="/starwars"> Star Wars</Link>
                    </Typography>
                    {user.username ? null : <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className="toolbar-link-title">
                      <Link to="/admin"> Admin Panel</Link>
                    </Typography>}


                    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className="toolbar-link-title" >
                      <span onClick={handleClick}>
                        {user.username ? user.username : user.email}
                      </span>

                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                      >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </Menu>
                    </Typography>


                  </div>
                </Toolbar>
              </AppBar>

              <Switch>
                <Route exact path="/starwars">
                  <StarWars />
                </Route>
                <Route exact path="/topics">
                  <Length />
                </Route>

                <Route path="/post">
                  <Posts />
                </Route>

                <Route path="/admin">
                  <AdminGuard component={() => <Admin />} hasPermission={user.email} />
                </Route>

                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="*">
                  <Error severity="error">
                    this page cannot be found!
                  </Error>
                </Route>

              </Switch>
            </div>
          </div>
          : <LoginControl logInAction={() => getUserData()} />
      }
    </div>
  );
}


