import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import logo from "../../assets/logo_white.png"
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import "./UserControls.css"

const UserControls = () => {
    const sessionUser = useSelector((store) => store.session.user)
    const location = useLocation()


    if (location.pathname === '/' || location.pathname === '/error' || !sessionUser){
        return null
    } else {
        return (
            <div className="user-controls-container">
                <div className="user-button">
                    <div className="user-circle" id={sessionUser?.id}>
                        <img src={logo} alt="logo-icon" className="user-logo-icon"/>
                    </div>
                    <div className="user-information">
                        <p className="current-username">{sessionUser?.username}</p>
                        <p className="current-user-tag">#{sessionUser?.user_tag}</p>
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