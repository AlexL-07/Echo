import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation, useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import FriendsPage from "./FriendsPage";
import './UserHomePage.css'
import { fetchFriendships } from "../../store/friendship";
import UserShowModal from "../UserShowModal"
import StatusDropDown from "../UserShowModal/StatusDropDown"
import ServerFormPage from "../ServerNav/ServerFormPage"
import DMChannel from "./DMChannel";
import { fetchDMChannels } from "../../store/dm_channel";
import ServerUserList from "../ServerShowPage/ServerUserList";


const UserHomePage = () => {
    const { dmChannelId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((store) => store.session.user);
    const dmChannel = useSelector((store) => store.dmChannels[dmChannelId]);
    const friendships = useSelector((store) => Object.values(store.friendships));
    const friends = friendships.map((el) => ({
        friend: el.friend,
        status: el.status,
        friendshipId: el.id,
        dmChannelId: el.dmChannelId
    }));

    console.log(dmChannel)

    const notiCount = friends.filter(
        (el) => el.status === "Pending" && !el.friend.user_id
    ).length;
    const [friendTab, setFriendTab] = useState("online");

    useEffect(() => {
        if(sessionUser){
            dispatch(fetchDMChannels());
        }
    }, [dispatch])


    
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
                    {!dmChannelId ? 
                    <>
                    <div className="friend-label">
                        <EmojiPeopleIcon />
                        <p>Friends</p>
                    </div>
                    <div className="user-button-online">
                        <button className="user-friend-button" 
                        id={
                        friendTab === "online"
                          ? "friend-option-active"
                          : undefined
                      }
                      onClick={() => setFriendTab("online")}>Online</button>
                    </div>
                    <div className="user-button-all">
                        <button className="user-friend-button"
                        id={
                            friendTab === "all" ? "friend-option-active" : undefined
                          }
                          onClick={() => setFriendTab("all")}>All</button>
                    </div>
                    <div className="user-button-pending">
                        <button className="user-friend-button"
                        id={
                            friendTab === "pending"
                              ? "friend-option-active"
                              : undefined
                          }
                          onClick={() => setFriendTab("pending")}>Pending
                          {!!notiCount && (
                            <span className="noti-count">{notiCount}</span>)}
                          </button>
                    </div>
                    <div className="user-blocked-button">
                        <button className="user-friend-button"
                        id={
                            friendTab === "blocked"
                              ? "friend-option-active"
                              : undefined
                          }
                          onClick={() => setFriendTab("blocked")}>Blocked</button>
                    </div>
                    </>
                    : 
                    <>
                        <p>@{dmChannel?.dm_user.username}</p>
                    </> }
                </div>
            </div>
            <div className="user-main-home">
                <div className="user-home-left">
                    <p>Direct Messages</p>
                    <ServerUserList />
                </div>
                <div className="user-home-right">
                {dmChannelId ? (
                    <DMChannel />
                ) : (
                  <FriendsPage
                    friendTab={friendTab}
                    sessionUser={sessionUser}
                    friendships={friendships}
                    friends={friends}
                  />
                )}
                </div>
            </div>
        </div>
        </>
    )
}
export default UserHomePage