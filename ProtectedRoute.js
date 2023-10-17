import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Footer from '../Footer/Footer';
import Header from "../Header/Header";

const ProtectedRoute = ({component: Component, ...props}) => {
  return (
    <>
        <Header
            loggedIn={props.loggedIn}
            path={props.path}
            isNavigationOpen={props.isNavigationOpen}
            handleNavBtnClick={props.handleNavBtnClick}
            handleNavigationClose={props.handleNavigationClose}
            resetStates={props.resetStates}
        />
        <main className='main'>
            <Route path={props.path}>
            {
                () => props.loggedIn ? <Component {...props} /> : <Redirect to="/"/>
            }
            </Route>
        </main>
        <Footer 
            needFooter={props.needFooter}
        />
    </>
)};

export default ProtectedRoute;