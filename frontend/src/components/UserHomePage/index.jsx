import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import React, {useState, useEffect} from "react";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import FriendsPage from "./FriendsPage";
import './UserHomePage.css'
import { fetchFriendships } from "../../store/friendship";
import UserShowModal from "../UserShowModal"
import StatusDropDown from "../UserShowModal/StatusDropDown"
import ServerFormPage from "../ServerNav/ServerFormPage"


const UserHomePage = () => {
    // const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    // const friendships = useSelector((store) => Object.values(store.friendships))
    // const friends = friendships
    //     .filter((el) => el.status !== "blocked" && el.status !== "pending")
    //     .map((el) => el.friend);
    // const blockedUsers = friendships
    //     .filter((el) => el.status === "blocked")
    //     .map((el) => el.friend);
    // let friendIds = friendships.map((el) => el.friend.id);
    // const [friendTab, setFriendTab] = useState("Online")

    // useEffect(() => {
    //     dispatch(fetchFriendships());
    // }, [dispatch])

    
    if (!sessionUser) {return <Redirect to='/'/>}
    return (
        <>
        <UserShowModal />
        <StatusDropDown />
        <ServerFormPage />
        <div className="user-home">
            <div className="user-banner">
                <div className="user-home-left">
                    <p>Hello {sessionUser.username}!</p>
                </div>
                <div className="user-home-right">
                    <div className="friend-label">
                        <EmojiPeopleIcon />
                        <p>Friends</p>
                    </div>
                    <div className="user-button-online">
                        <button className="user-friend-button">Online</button>
                    </div>
                    <div className="user-button-all">
                        <button className="user-friend-button">All</button>
                    </div>
                    <div className="user-button-pending">
                        <button className="user-friend-button">Pending</button>
                    </div>
                    <div className="user-blocked-button">
                        <button className="user-friend-button">Blocked</button>
                    </div>
                </div>
            </div>
            <div className="user-main-home">
                <div className="user-home-left">
                    <p>Direct Messages</p>
                </div>
                <div className="user-home-right">
                    {/* <FriendsPage 
                        friendTab={friendTab}
                        sessionUser={sessionUser}
                        friendships={friendships}
                        friends={friends}
                    /> */}
                </div>
            </div>
        </div>
        </>
    )
}
export default UserHomePage