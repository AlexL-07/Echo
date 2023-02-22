import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useSelector } from 'react-redux';

const UserItem = ({ user, friendIds, friendships, blockedIds }) => {
    const sessionUser = useSelector((store) => store.session.user)

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
                            <PersonAddIcon />
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
                        <p className="user-text">{user.username.toLowerCase()}</p>
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