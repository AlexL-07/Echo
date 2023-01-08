import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import logo from "../../../assets/logo_white.png"
import "./ServerUserList.css"
// 


const ServerUserList = () => {
    const {serverId} = useParams()
    const server = useSelector((store)=> store.servers[serverId])
    const onlineUsers = [];
    const offlineUsers = [];
    if(server){Object.values(server?.users).forEach((user) => {
        if(user.status === "Online" || user.status === "Idle" || user.status === "Do Not Disturb"){
            onlineUsers.push(user)
        } else {
            offlineUsers.push(user)
        }
    })}
    return (
        <div className="server-members">
            <p className="top-user-text">ONLINE</p>
            <ul className="server-user-list">
                {onlineUsers.map((user)=>(
                    <div className="user-list-item">
                        <li key={user.id} className="user-item online">
                            <div className="user-circle" id={user.id}>
                                <img src={logo} alt="logo-icon" className="user-logo-icon"/>
                            </div>
                                <p className="user-text">{user.username}</p>
                        </li>
                    </div>
                ))}
            </ul>
            <p>OFFLINE</p>
            <ul className="server-user-list offline">
                {offlineUsers.map((user)=>(
                    <div className="user-list-item">
                    <li key={user.id} className="user-item offline">
                        <div className="user-circle offline" id={user.id}>
                            <img src={logo} alt="logo" className="logo-icon offline"/>
                        </div>
                        <p className="user-text offline">{user.username}</p>
                    </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ServerUserList