import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import Axios from "axios";
import './App.css';

//Components:
import Home from './home/home';
import Register from './register/register';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import Profile from './profile/profile';

//TODO: Add logic for changing the navbar for when the user is vs. isn't logged in:
 // When the user is logged in, they should have a home, dashboard, profile, and log out page
 // When the user is not logged in, they should have a home, register, and log in page

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  //Set the background color of every page:
  useEffect(() => {
    document.body.style.backgroundColor = '#F8FBFE';
  }, []);

  const checkLoggedIn = () => {
    //Check whether the user is logged in
    Axios.post('/loggedIn', {
    })
    .then(response => {
      if (response.data.loggedIn) {
        console.log('logged in on front-end');
        setLoggedIn(true);
      } else {
        console.log('not logged in on front-end');
        setLoggedIn(false);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div>
      <Navbar loggedIn={loggedIn}/>

      {/* A <Switch> looks through its children <Route>s and 
          renders the first one that matches the current URL. */}
      <Switch>
          <Route path="/" exact>
            <Home checkLoggedIn={checkLoggedIn}/>
          </Route>
          <Route path="/register">
            {loggedIn ? <Redirect to="/dashboard" /> : <Register checkLoggedIn={checkLoggedIn}/>}
          </Route>
          <Route path="/login">
            {loggedIn ? <Redirect to="/dashboard" /> : <Login checkLoggedIn={checkLoggedIn}/>}
          </Route>
          <Route path="/dashboard">
            {loggedIn ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile">
            {loggedIn ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/logout">
            {/*TODO: Implement Log Out Page */}
            {loggedIn ? <div>Log Out</div> : <Redirect to="/" />}
          </Route>
      </Switch>
    </div>
  );
}

function Navbar(props) {
  const linkStyle = {
    color: "black",
    fontSize: "150%",
    marginRight: "3px"
  }

  //Navigation links to render based on whether the user is logged in
  const navLinks = props.loggedIn ? 
  <>
    <li class="nav-item">
      <Link className="nav-link" to="/dashboard" style={linkStyle}>Dashboard </Link>
    </li>
    <li class="nav-item">
      <Link className="nav-link" to="/profile" style={linkStyle}>Profile </Link>
    </li>
    <li class="nav-item">
      <Link className="nav-link" to="/logout" style={linkStyle}>Log Out </Link>
    </li>
  </>
  :
  <>
    <li class="nav-item">
      <Link className="nav-link" to="/register" style={linkStyle}>Register </Link>
    </li>
    <li class="nav-item">
      <Link className="nav-link" to="/login" style={linkStyle}>Log In </Link>
    </li>
  </>

  return (
    <>
    <nav class="navbar navbar-expand-lg" style={{ backgroundColor:'#FAFAFA' }}>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link className="nav-link" to="/" style={linkStyle}>Home </Link>
          </li>
          {navLinks}
          {/* <li class="nav-item">
            <Link className="nav-link" to="/profile" style={linkStyle}>Profile </Link>
          </li> */}
        </ul>
      </div>
    </nav>
    </>
  );
};