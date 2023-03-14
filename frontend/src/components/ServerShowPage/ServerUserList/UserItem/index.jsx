import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../../../assets/logo_white.png";
import { createFriendship, updateFriendship, deleteFriendship } from '../../../../store/friendship';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import YesIcon from "@mui/icons-material/Check";
import NoIcon from "@mui/icons-material/Close";

const UserItem = ({ user, friendIds, friendships, blockedIds, pendingIds }) => {
    const {serverId} = useParams();
    const sessionUser = useSelector((store) => store.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const friendship = friendships.find((el) => el.friend.id === user.id);
    const [hovered, setHovered] = useState(false)

    const handleAddFriend = (e) => {
        const friendshipData = { user_id: sessionUser.id, friend_id: user.id, status: "Pending"};
        dispatch(createFriendship(friendshipData))
    }

    const blockFriend = (e) => {
        const friendship = friendships.find((el) => el.friend.id === user.id);
        const friendshipData = { ...friendship, status: "Blocked" };
        dispatch(updateFriendship(friendshipData))
    }

    const handleAcceptFriend = (e) => {
        const friendship = friendships.find((el) => el.friend.id === user.id);
        const friendshipData = { ...friendship, status: "Accepted" };
        dispatch(updateFriendship(friendshipData))
    }

    const handleBlockUser = (e) => {
        const friendshipData = { user_id: sessionUser.id, friend_id: user.id, status: "Blocked"};
        dispatch(createFriendship(friendshipData))
    }

    const handleDelete = (e) => {
        const friendshipId = friendships.find(
            (el) => el.friend.id === user.id
          ).id;
        dispatch(deleteFriendship(friendshipId))
    }


    const friendShipButtons = () => {
        if(user.id === sessionUser.id){
            return(
                null
            )
        } else {
            if(friendIds.includes(user.id)){
                return(
                    <>
                        <div className='friendship-buttons' id={hovered ? "show-element" : undefined}>
                            <PersonRemoveIcon onClick={handleDelete}/>
                            <LockPersonIcon onClick={blockFriend}/>
                        </div>
                    </>
                )
            } else if(blockedIds.includes(user.id)){
                return(
                    <>
                        <div className='friendship-buttons' id={hovered ? "show-element" : undefined}>
                            <LockOpenIcon onClick={handleDelete}/>
                        </div>
                    </>
                )
            } else if (pendingIds.includes(user.id)) {
                return(
                    <>
                        <div className='friendship-buttons' id={hovered ? "show-element" : undefined}>
                            <YesIcon onClick={handleAcceptFriend}/>
                            <NoIcon onClick={handleDelete}/>
                            <LockPersonIcon onClick={blockFriend}/>
                        </div>
                    </>
                )

            } else {
                return(
                    <>
                        <div className='friendship-buttons' id={hovered ? "show-element" : undefined}>
                            <PersonAddIcon onClick={handleAddFriend}/>
                            <LockPersonIcon onClick={handleBlockUser}/>
                        </div>
                    </>
                )

            }

        }
    }

    if(user.status === "Do Not Disturb"){
        return(
            <div className="user-list-item">
                <li key={user.id} className="user-item" 
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>
                    <div className='user-item-left'>
                        <div className="user-circle-container">
                            <div className="user-circle" id="dnd">
                                <img src={logo} alt="logo-icon" className="logo-icon"/>
                            </div>
                        </div>
                            <p className="user-text">{user.username}</p>
                    </div>
                    <div className='user-item-right'>
                        {friendShipButtons()}
                    </div>
                </li>
            </div>
        )
    } else {
        return(
            <div className="user-list-item">
                <li key={user.id} className="user-item" 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={(e)=>{
                    e.stopPropagation()
                    if(!serverId && user.id !== sessionUser.id && friendship.status === "Accepted"){
                        history.push(`/channel/@me/${friendship.dm_channel_id}`)
                    }
                }}>
                    <div className='user-item-left'>
                        <div className="user-circle-container">
                            <div className="user-circle" id={user.status.toLowerCase()}>
                                <img src={logo} alt="logo-icon" className="logo-icon"/>
                            </div>
                        </div>
                            <p className="user-text">{user.username}</p>
                    </div>
                    {serverId ? 
                    <div className='user-item-right'>
                        {friendShipButtons()}
                    </div>
                    : undefined
                    }
                </li>
            </div>
        )
    }

}

export default UserItem