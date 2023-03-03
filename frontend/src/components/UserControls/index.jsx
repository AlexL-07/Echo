import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import logo from "../../assets/logo_white.png"
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import "./UserControls.css"
import { useContext } from "react";
import { ModalContext } from "../../App";

const UserControls = () => {
    const sessionUser = useSelector((store) => store.session.user)
    const users = useSelector((store) => store.users)
    const user = useSelector((store) => store.users[sessionUser.id])
    const location = useLocation()
    const {setIsUserOpen} = useContext(ModalContext)
    
    const userStatus = () => {
        if(user?.status === "Do Not Disturb"){
            return ("dnd");
        } else {
            return (user?.status.toLowerCase())
        }
    }


    if (location.pathname === '/' || location.pathname === '/error' || !sessionUser){
        return null
    } else {
        return (
            <div className="user-controls-container">
                <div className="user-button" onClick={()=>{setIsUserOpen(true)}}>
                    <div className="user-circle" id={userStatus()}>
                        <img src={logo} alt="logo-icon" className="logo-icon"/>
                    </div>
                    <div className="user-information">
                        <p className="current-username">{user?.username}</p>
                        <p className="current-user-tag">#{user?.user_tag}</p>
                    </div>
                </div>
                <div className="audio-and-settings">
                    <button><MicIcon fontSize="small"/></button>
                    <button><HeadsetIcon fontSize="small"/></button>
                    <button><SettingsIcon fontSize="small"/></button>
                </div>
            </div>
        
        )
    }
}

export default UserControls