import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../../../assets/logo_white.png";
import { createFriendship, updateFriendship, deleteFriendship } from '../../../../store/friendship';

const UserItem = ({ user, friendIds, friendships, blockedIds, pendingIds }) => {
    const sessionUser = useSelector((store) => store.session.user);
    const dispatch = useDispatch();

    const handleAddFriend = () => {
        const friendshipData = { user_id: sessionUser.id, friend_id: user.id};
        dispatch(createFriendship(friendshipData))
    }

    const blockFriend = () => {
        const friendship = friendships.find((el) => el.friend.id === user.id);
        const friendshipData = { ...friendship, status: "Blocked" };
        dispatch(updateFriendship(friendshipData))
    }

    const handleAcceptFriend = () => {
        const friendship = friendships.find((el) => el.friend.id === user.id);
        const friendshipData = { ...friendship, status: "Accepted" };
        dispatch(updateFriendship(friendshipData))
    }

    const handleBlockUser = () => {
        const friendshipData = { user_id: sessionUser.id, friend_id: user.id, status: "Blocked"};
        dispatch(createFriendship(friendshipData))
    }

    const handleDelete = () => {
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
                        <div className='friendship-buttons'>
                            <PersonRemoveIcon onClick={handleDelete}/>
                            <LockPersonIcon onClick={blockFriend}/>
                        </div>
                    </>
                )
            } else if(blockedIds.includes(user.id)){
                return(
                    <>
                        <div className='friendship-buttons'>
                            <LockOpenIcon onClick={handleDelete}/>
                        </div>
                    </>
                )
            } else if (pendingIds.includes(user.id)) {
                return(
                    <>
                        <div className='friendship-buttons'>
                            <TaskAltIcon onClick={handleAcceptFriend}/>
                            <CancelIcon onClick={handleDelete}/>
                            <LockPersonIcon onClick={blockFriend}/>
                        </div>
                    </>
                )

            } else {
                return(
                    <>
                        <div className='friendship-buttons'>
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
                <li key={user.id} className="user-item" >
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
                <li key={user.id} className="user-item" >
                    <div className='user-item-left'>
                        <div className="user-circle-container">
                            <div className="user-circle" id={user.status.toLowerCase()}>
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
    }

}

export default UserItem