import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Redirect, useLocation } from "react-router-dom";
import React, {useContext, useEffect} from "react";
import './UserHomePage.css'
import ServerFormPage from "../ServerNav/ServerFormPage";
import UserShowModal from "../UserShowModal";
import StatusDropDown from "../UserShowModal/StatusDropDown";
const UserHomePage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const location = useLocation();
    console.log(location)
    
    if (!sessionUser) return <Redirect to='/'/>
    

    return (
        <>
        <UserShowModal />
        <StatusDropDown />
        <ServerFormPage />
        <div className="user-home">
            <h1>Welcome to the User's Home Page</h1>
        </div>
        </>
    )
}
export default UserHomePage