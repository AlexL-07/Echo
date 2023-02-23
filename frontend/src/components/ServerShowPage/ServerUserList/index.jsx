import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import logo from "../../../assets/logo_white.png"
import "./ServerUserList.css"
import consumer from "../../consumer"
import { useEffect } from "react"
import { fetchServer } from "../../../store/server"
import { addUser, fetchUsers, removeUser } from "../../../store/user"
import { fetchFriendships } from "../../../store/friendship"
import UserItem from "./UserItem"
// 


const ServerUserList = () => {
    const {serverId} = useParams()
    const dispatch = useDispatch()
    const server = useSelector((store)=> store.servers[serverId])
    const sessionUser = useSelector((store) => store.session.user)
    const users = useSelector((store) => store.users)
    const friendships = useSelector((store) => Object.values(store.friendships))
    const friends = friendships
    .filter((el) => el.status !== "Blocked" && el.status !== "Pending")
    .map((el) => el.friend);
    const blockedIds = friendships
      .filter((el) => el.status === "Blocked")
      .map((el) => el.friend.id);
    let friendIds = friendships.map((el) => el.friend.id);
    const onlineUsers = [];
    const idleUsers = [];
    const dndUsers = [];
    const offlineUsers = [];

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
            {channel: "ServersChannel", id: serverId},
            {
                received: (userObj) => {
                    switch (userObj.type) {
                        case "RECEIVE_USER":
                            dispatch(addUser(userObj));
                            break;
                        case "UPDATE_USER":
                            dispatch(addUser(userObj));
                            break;
                        case "REMOVE_USER":
                            dispatch(removeUser(userObj))
                            break;
                        default:
                            console.log("Unhandled broadcast: ", userObj.type);
                            break;
                    }
                }
            }
        )
        return () => subscription?.unsubscribe();
    }, [dispatch, serverId])

    useEffect(() => {
        if(sessionUser){
            dispatch(fetchFriendships())
        }
    },[dispatch])
    
    if(server){Object.values(users).forEach((user) => {
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
                    // <div className="user-list-item">
                    //     <li key={user.id} className="user-item" >
                    //         <div className="user-circle-container">
                    //         <div className="user-circle online" id="online">
                    //             <img src={logo} alt="logo-icon" className="logo-icon"/>
                    //         </div>
                    //         </div>
                    //             <p className="user-text">{user.username}</p>
                    //     </li>
                    // </div>
                    <UserItem 
                        user={user}
                        friendIds={friendIds}
                        friendships={friendships}
                        blockedIds={blockedIds} />
                ))}
            </ul>
            <p>IDLE</p>
            <ul className="server-user-list idle">
                {idleUsers.map((user)=>(
                    // <div className="user-list-item">
                    // <li key={user.id} className="user-item" >
                    //     <div className="user-circle idle" id= "idle">
                    //         <img src={logo} alt="logo" className="logo-icon idle"/>
                    //     </div>
                    //     <p className="user-text idle">{user.username}</p>
                    // </li>
                    // </div>
                    <UserItem 
                        user={user}
                        friendIds={friendIds}
                        friendships={friendships}
                        blockedIds={blockedIds} />
                ))}
            </ul>
            <p>DO NOT DISTURB</p>
            <ul className="server-user-list dnd">
                {dndUsers.map((user)=>(
                    // <div className="user-list-item">
                    // <li key={user.id} className="user-item" >
                    //     <div className="user-circle dnd" id="dnd">
                    //         <img src={logo} alt="logo" className="logo-icon dnd"/>
                    //     </div>
                    //     <p className="user-text dnd">{user.username}</p>
                    // </li>
                    // </div>
                    <UserItem 
                        user={user}
                        friendIds={friendIds}
                        friendships={friendships}
                        blockedIds={blockedIds} />
                ))}
            </ul>
            <p>OFFLINE</p>
            <ul className="server-user-list offline">
                {offlineUsers.map((user)=>(
                    // <div className="user-list-item">
                    // <li key={user.id} className="user-item" >
                    //     <div className="user-circle offline" id="offline">
                    //         <img src={logo} alt="logo" className="logo-icon offline"/>
                    //     </div>
                    //     <p className="user-text offline">{user.username}</p>
                    // </li>
                    // </div>
                    <UserItem 
                        user={user}
                        friendIds={friendIds}
                        friendships={friendships}
                        blockedIds={blockedIds} />
                ))}
            </ul>
        </div>
    )
}

export default ServerUserList