import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import logo from "../../../assets/logo_white.png"
import "./ServerUserList.css"
import consumer from "../../consumer"
import { useEffect } from "react"
import { fetchServer } from "../../../store/server"
import { addUser, fetchUsers, removeUser } from "../../../store/user"
import { fetchFriendships, addFriendship, removeFriendship } from "../../../store/friendship"
import UserItem from "./UserItem"
// 


const ServerUserList = ({users}) => {
    const {serverId} = useParams()
    const dispatch = useDispatch()
    const server = useSelector((store)=> store.servers[serverId])
    const sessionUser = useSelector((store) => store.session.user)
    const sessionUserId = sessionUser?.id;
    // const users = useSelector((store) => store.users)
    const friendships = useSelector((store) => Object.values(store.friendships))
    const friends = friendships
    // .filter((el) => el.status !== "Blocked" && el.status !== "Pending")
        .filter((el) => el.status === "Accepted")
        .map((el) => el.friend);
    const blockedIds = friendships
      .filter((el) => el.status === "Blocked")
      .map((el) => el.friend.id);
    let friendIds = friends.map((el) => el.id);
    const pendingIds = friendships
        .filter((el) => el.status === "Pending")
        .map((el) => el.friend.id)
    const onlineUsers = [];
    const idleUsers = [];
    const dndUsers = [];
    const offlineUsers = [];

    // useEffect(() => {
    //     const subscription = consumer.subscriptions.create(
    //       { channel: "FriendshipsChannel", id: sessionUserId },
    //       {
    //         received: (friendshipObj) => {
    //           switch (friendshipObj.type) {
    //             case "RECEIVE_FRIENDSHIP":
    //               dispatch(addFriendship(friendshipObj));
    //               break;
    //             case "DESTROY_FRIENDSHIP":
    //               dispatch(removeFriendship(friendshipObj.id));
    //               break;
    //             case "UPDATE_FRIENDSHIP":
    //               dispatch(addFriendship(friendshipObj));
    //               break;
    //             default:
    //               console.log("Unhandled broadcast: ", friendshipObj.type);
    //               break;
    //           }
    //         },
    //       }
    //     );
    //     return () => subscription?.unsubscribe();
    //   }, [sessionUserId, dispatch]);

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
        <>
        
        <div className="server-members">
        {users ? 
        <>
            <p className="top-user-text">ONLINE</p>
            <ul className="server-user-list">
                {onlineUsers.map((user)=>(
                    <UserItem 
                        user={user}
                        friendIds={friendIds}
                        friendships={friendships}
                        blockedIds={blockedIds}
                        pendingIds={pendingIds} />
                ))}
            </ul>
            <p>IDLE</p>
            <ul className="server-user-list idle">
                {idleUsers.map((user)=>(
                    <UserItem 
                        user={user}
                        friendIds={friendIds}
                        friendships={friendships}
                        blockedIds={blockedIds}
                        pendingIds={pendingIds} />
                ))}
            </ul>
            <p>DO NOT DISTURB</p>
            <ul className="server-user-list dnd">
                {dndUsers.map((user)=>(
                    <UserItem 
                        user={user}
                        friendIds={friendIds}
                        friendships={friendships}
                        blockedIds={blockedIds}
                        pendingIds={pendingIds} />
                ))}
            </ul>
            <p>OFFLINE</p>
            <ul className="server-user-list offline">
                {offlineUsers.map((user)=>(
                    <UserItem 
                        user={user}
                        friendIds={friendIds}
                        friendships={friendships}
                        blockedIds={blockedIds}
                        pendingIds={pendingIds} />
                ))}
            </ul>
            </> :  
            friends.map((user) => (
                <UserItem 
                    user={user}
                    friendIds={friendIds}
                    friendships={friendships}
                    blockedIds={blockedIds}
                    pendingIds={pendingIds}
                    />
            ))     
        }
        </div> 
        </>
    )
}

export default ServerUserList