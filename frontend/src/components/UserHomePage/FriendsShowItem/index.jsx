import React from "react";
import { useHistory } from "react-router-dom"
import { deleteFriendship, updateFriendship } from "../../../store/friendship";
import logo from "../../../assets/logo_white.png";
import YesIcon from "@mui/icons-material/Check";
import NoIcon from "@mui/icons-material/Close";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const FriendsShowItem = ({friendTab, friendObj, friendships}) => {
    const history = useHistory()
    const friend = friendObj.friend;
    const friendshipReceiver = !!friend.friend_id;

    const handleAcceptInvite = (e) => {
        const friendship = friendships.find(
            (el) => el.id === friendObj.friendshipId
        );
        const friendshipData = {...friendship, status: "Accepted"};
        updateFriendship(friendshipData)
    }

    const handleIgnoreInvite = (e) => {
        deleteFriendship(friendObj.friendshipId)
    }

    const friendStatus = () => {
        if(friend.status === "Do Not Disturb"){
            return ("dnd");
        } else {
            return (friend.status.toLowerCase());
        }
    }

    return(
        <>
            <div className="options-divider" id="user-divider"></div>
            <li className="friend-show-li">
                <div className="friend-item-left">
                    <div className="user-circle-container">
                        <div className="user-circle" id={friendStatus()}>
                            <img src={logo} alt="logo-icon" className="logo-icon"/>
                        </div>
                    </div>
                    <div className="li-user-details">
                        <p className="user-text">{friend.username} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #{friend.user_tag}</p>
                        {friendTab === "pending" ? (
                            <>
                                {friendshipReceiver ? (
                                  <p className="user-status">Incoming Friend Request</p>
                                ) : (
                                  <p className="user-status">Outgoing Friend Request</p>
                                )}
                            </>
                        ) : (
                          <p className="user-status">{friend.status}</p>
                        )}
                    </div>
                </div>
                <div className="friend-item-right">
                    {friendTab === "pending" ? (
                        <>
                            {friendshipReceiver && (
                                <>
                                    <div className="user-item-option" onClick={handleAcceptInvite}>
                                        <YesIcon sx={{ fontSize: "18px" }}/>
                                    </div>
                                    <div className="user-item-option" onClick={handleIgnoreInvite}>
                                        <NoIcon sx={{ fontSize: "18px" }}/>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {friendTab !== "blocked" && (
                                <div className="user-item-option" onClick={() => history.push(`/me/channels/${friendObj.dmChannelId}`)}>
                                    <ChatBubbleIcon sx={{ fontSize: "18px", color: "#DCDDDE" }}/>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </li>
        </>
    )
}

export default FriendsShowItem