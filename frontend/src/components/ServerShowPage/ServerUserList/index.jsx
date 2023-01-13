import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import logo from "../../../assets/logo_white.png"
import "./ServerUserList.css"
// 


const ServerUserList = () => {
    const {serverId} = useParams()
    const server = useSelector((store)=> store.servers[serverId])
    const onlineUsers = [];
    const idleUsers = [];
    const dndUsers = [];
    const offlineUsers = [];
    
    if(server){Object.values(server?.users).forEach((user) => {
        if(user.status === "Online"){
            onlineUsers.push(user)
        } else if(user.status === "Idle"){
            idleUsers.push(user)
        }else if(user.status === "Do Not Disturb"){
            dndUsers.push(user)
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
                            <div className="user-circle online" id={user.id}>
                                <img src={logo} alt="logo-icon" className="user-logo-icon"/>
                            </div>
                                <p className="user-text">{user.username}</p>
                        </li>
                    </div>
                ))}
            </ul>
            <p>IDLE</p>
            <ul className="server-user-list idle">
                {idleUsers.map((user)=>(
                    <div className="user-list-item">
                    <li key={user.id} className="user-item idle">
                        <div className="user-circle idle" id={user.id}>
                            <img src={logo} alt="logo" className="logo-icon idle"/>
                        </div>
                        <p className="user-text idle">{user.username}</p>
                    </li>
                    </div>
                ))}
            </ul>
            <p>DO NOT DISTURB</p>
            <ul className="server-user-list dnd">
                {dndUsers.map((user)=>(
                    <div className="user-list-item">
                    <li key={user.id} className="user-item dnd">
                        <div className="user-circle dnd" id={user.id}>
                            <img src={logo} alt="logo" className="logo-icon dnd"/>
                        </div>
                        <p className="user-text dnd">{user.username}</p>
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