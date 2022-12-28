import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import React from 'react';
import {Route, Switch} from 'react-router-dom'
// import Navigation from "./components/Navigation";
import UserHomePage from "./components/UserHomePage";
import SplashPage from "./components/SplashPage";

function App() {
  return (
    <>
    {/* <Navigation /> */}
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/register">
          <SignupFormPage />
        </Route>
        <Route path="/channel/@me">
          <UserHomePage />
        </Route>
      </Switch>
    </>
    
  );
}
export default App;
