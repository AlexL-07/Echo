import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import UserHomePage from "./components/UserHomePage";
import SplashPage from "./components/SplashPage";
import ErrorPage from "./components/ErrorPage";
import ServerNav from "./components/ServerNav";
import ServerShowPage from "./components/ServerShowPage";
import UserControls from "./components/UserControls";

function App() {
  return (
    <>
      <UserControls />
      <ServerNav />
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
        <Route exact path="/servers/:serverId/channels/:channelId">
          <ServerShowPage />
        </Route>
        <Route exact path="/servers/:serverId">
          <ServerShowPage />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
        <Redirect to='/error' />
      </Switch>
    </>
    
  );
}
export default App;
