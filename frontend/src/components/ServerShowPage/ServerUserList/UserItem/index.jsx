import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../../../assets/logo_white.png"
import { createFriendship } from '../../../../store/friendship';

const UserItem = ({ user, friendIds, friendships, blockedIds }) => {
    const sessionUser = useSelector((store) => store.session.user);
    const dispatch = useDispatch();

    const handleAddFriend = () => {
        const friendshipData = { user_id: sessionUser.id, friend_id: user.id};
        dispatch(createFriendship(friendshipData))
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
                            <PersonRemoveIcon />
                            <BlockIcon />
                        </div>
                    </>
                )
            } else if(blockedIds.includes(user.id)){
                return(
                    <>
                        <div className='friendship-buttons'>
                            <TaskAltIcon />
                        </div>
                    </>
                )
            } else {
                return(
                    <>
                        <div className='friendship-buttons'>
                            <PersonAddIcon onClick={handleAddFriend}/>
                            <BlockIcon />
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
                    <div className="user-circle-container">
                        <div className="user-circle" id="dnd">
                            <img src={logo} alt="logo-icon" className="logo-icon"/>
                        </div>
                    </div>
                        <p className="user-text">{user.username}</p>
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