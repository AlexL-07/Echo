import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { deleteFriendship, updateFriendship } from "../../../store/friendship";
import logo from "../../../assets/logo_white.png";
import YesIcon from "@mui/icons-material/Check";
import NoIcon from "@mui/icons-material/Close";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useDispatch } from "react-redux";

const FriendsShowItem = ({friendTab, friendObj, friendships}) => {
    const history = useHistory()
    const friend = friendObj.friend;
    const friendshipReceiver = !!friend.friend_id;
    const friendship = friendships.find((el) => el.friend.id === friend.id)
    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();

    const handleAcceptInvite = (e) => {
        const friendship = friendships.find(
            (el) => el.id === friendObj.friendshipId
        );
        const friendshipData = {...friendship, status: "Accepted"};
        dispatch(updateFriendship(friendshipData))
    }

    const handleIgnoreInvite = (e) => {
        dispatch(deleteFriendship(friendObj.friendshipId))
    }

    const friendStatus = () => {
        if(friend.status === "Do Not Disturb"){
            return ("dnd");
        } else {
            return (friend.status.toLowerCase());
        }
    }

    const handleDelete = (e) => {
        const friendshipId = friendships.find(
            (el) => el.friend.id === friend.id
          ).id;
        dispatch(deleteFriendship(friendshipId))
    }

    const blockFriend = (e) => {
        const friendshipData = { ...friendship, status: "Blocked" };
        dispatch(updateFriendship(friendshipData))
    }

    return(
        <>
            <div className="options-divider" id="user-divider"></div>
            <li className="friend-show-li" key={friend.id} 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <div className="friend-item-left">
                    <div className="user-circle-container">
                        <div className="user-circle" id={friendStatus()}>
                            <img src={logo} alt="logo-icon" className="logo-icon"/>
                        </div>
                    </div>
                    <div className="li-user-details">
                        <p className="user-text">{friend.username}
                            <span className="hidden-user-tag" id={hovered ? "show-element" : undefined}>#{friend.user_tag}</span>
                        </p>
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
                            {friendTab !== "blocked" ? (
                                <>
                                <div className="user-item-option" id={hovered ? "show-element" : undefined} onClick={handleDelete}>
                                    <PersonRemoveIcon sx={{ fontSize: "18px", color: "#DCDDDE" }} />
                                </div>
                                <div className="user-item-option" id={hovered ? "show-element" : undefined} onClick={blockFriend}>
                                    <LockPersonIcon sx={{ fontSize: "18px", color: "#DCDDDE" }} />
                                </div>
                                </>
                            ) : (
                                <div className="user-item-option" id={hovered ? "show-element" : undefined}>
                                    <LockOpenIcon sx={{ fontSize: "18px", color: "#DCDDDE" }} onClick={handleDelete}/>
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