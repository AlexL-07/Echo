import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ModalContext } from "../../App"
import logo from "../../assets/logo_white.png"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import online from "../../assets/online.png";
import disturb from "../../assets/red-do-not-disturb.png";
import LogoutIcon from '@mui/icons-material/Logout';
import idle from "../../assets/idle.png";
// import { fetchUser } from "../../store/user";
import { logout } from "../../store/session";

const UserShow = () => {
    const {setIsStatusOpen} = useContext(ModalContext)
    const dispatch = useDispatch()
    const sessionUser = useSelector((store) => store.session.user)
    const user = useSelector((store) => store.users[sessionUser.id])
    // const user = users[sessionUser.id]
    // const currentUser = useSelector((store) => store.users[sessionUser.id])
    
    // useEffect(()=>{
    //     if(sessionUser){
    //         dispatch(fetchUser(sessionUser.id))
    //     }
    // }, [sessionUser, dispatch])

    const formatDate = (timestamp) => {
        let dateObj = new Date(timestamp);
        let dateStr = dateObj.toString();
        let month = dateStr.substring(4,7)
        let date = dateStr.substring(8,10)
        let year = dateStr.substring(11, 15);

        return(
            `${month} ${date}, ${year}`
        )
    }

    const statusDisplay = (userStatus) => {
        if(userStatus === "Online"){
            return (
                <>
                <div className="bubble-status">
                    <img src={online} alt="online-logo" className="status-logo online"/>
                    {userStatus}
                </div>
                <KeyboardArrowRightIcon />
                </>
            )
        } else if (userStatus === "Idle") {
            return (
                <>
                <div className="bubble-status">
                    <img src={idle} alt="idle-logo" className="status-logo idle"/>
                    {userStatus}
                </div>
                <KeyboardArrowRightIcon />
                </>
            )
        } else if (userStatus === "Do Not Disturb"){
            return(
                <>
                <div className="bubble-status">
                    <img src={disturb} alt="dnd-logo" className="status-logo dnd"/>
                    {userStatus}
                </div>
                <KeyboardArrowRightIcon />
                </>
            )
        }

    }

    return (
        <div className="user-show-container">
            <div className="user-header-container">
                <img src={logo} alt="logo-icon" className="user-show-logo"/>
            </div>
            <div className="user-info-container">
                <div className="user-info-body">
                    <div className="username-usertag">
                        <h3>{sessionUser.username}</h3>
                        <h3 className="user-tag">#{sessionUser.user_tag}</h3>
                    </div>
                    <div className="divider2"></div>
                    <div className="member-since">
                        <p className="member-time-header">ECHO MEMBER SINCE</p>
                        <p className="member-date">{formatDate(sessionUser.created_at)}</p>
                    </div>
                    <div className="divider2"></div>
                    <div className="status-form-container" onMouseOver={()=>setIsStatusOpen(true)}>
                        {statusDisplay(user.status)}
                    </div>
                    <div className="divider2"></div>
                    <div className="signout-container" onClick={()=>dispatch(logout())}>
                        <p>Log Out</p>
                        <LogoutIcon />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default UserShow