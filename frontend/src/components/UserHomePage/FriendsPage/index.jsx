import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import consumer from "../../consumer";
import { addFriendship, removeFriendship } from "../../../store/friendship";
import FriendsShowItem from "../FriendsShowItem";

const FriendsPage = ({ sessionUser, friendTab, friendships, friends }) => {
    const dispatch = useDispatch();
    const sessionUserId = sessionUser?.id;
    const history = useHistory();
    if(!sessionUserId) history.push("/login");


    const onlineFriends = friends.filter(
        (el) => 
            el.friend.status === "Online" &&
            el.status !== "Blocked" && 
            el.status !== "Pending"
    )

    const allFriends = friends.filter(
        (el) => el.status !== "Pending" && el.status !== "Blocked"
    );

    const pendingFriends = friends.filter(
        (el) => el.status === "Pending" && el.status !== "Blocked"
    )

    const blockedFriends = friends.filter(
        (el) => el.status === "Blocked"
    )

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
          { channel: 'FriendshipsChannel', id: sessionUserId },
          {
            received: (friendshipObj) => {
              switch (friendshipObj.type) {
                case 'RECEIVE_FRIENDSHIP':
                  dispatch(addFriendship(friendshipObj));
                  break;
                case 'DESTROY_FRIENDSHIP':
                  dispatch(removeFriendship(friendshipObj.id));
                  break;
                case 'UPDATE_FRIENDSHIP':
                  dispatch(addFriendship(friendshipObj));
                  break;
                default:
                  console.log('Unhandled broadcast: ', friendshipObj.type);
                  break;
              }
            },
          }
        );
        return () => subscription?.unsubscribe();
      }, [sessionUserId, dispatch]);

      if (friendTab === "online") {
        return (
          <div className="friend-show-main">
            <div className="user-text-channels">
              <p className="user-home-top-text">ONLINE &#8212; {onlineFriends.length}</p>
            </div>
            <ul className="friend-items-ul">
              {onlineFriends.map((friendObj, idx) => (
                <FriendsShowItem
                  friendTab={friendTab}
                  friendObj={friendObj}
                  key={idx}
                  friendships={friendships}
                />
              ))}
            </ul>
            <div className="options-divider" id="user-divider"></div>
          </div>
        );
      } else if (friendTab === "all") {
        return (
          <div className="friend-show-main">
            <div className="user-text-channels">
              <p className="user-home-top-text">ALL FRIENDS &#8212; {allFriends.length}</p>
            </div>
            <ul className="friend-items-ul">
              {allFriends.map((friendObj, idx) => (
                <FriendsShowItem
                  friendTab={friendTab}
                  friendObj={friendObj}
                  key={idx}
                  friendships={friendships}
                />
              ))}
            </ul>
            <div className="options-divider" id="user-divider"></div>
          </div>
        );
      } else if (friendTab === "pending") {
        return (
          <div className="friend-show-main">
            <div className="user-text-channels">
              <p className="user-home-top-text">PENDING &#8212; {pendingFriends.length}</p>
            </div>
            <ul className="friend-items-ul">
              {pendingFriends.map((friendObj, idx) => (
                <FriendsShowItem
                  friendTab={friendTab}
                  friendObj={friendObj}
                  key={idx}
                  friendships={friendships}
                />
              ))}
            </ul>
            <div className="options-divider" id="user-divider"></div>
          </div>
        );
      } else {
        return (
          <div className="friend-show-main">
            <div className="user-text-channels">
              <p className="user-home-top-text">BLOCKED &#8212; {blockedFriends.length}</p>
            </div>
            <ul className="friend-items-ul">
              {blockedFriends.map((friendObj, idx) => (
                <FriendsShowItem
                  friendTab={friendTab}
                  friendObj={friendObj}
                  key={idx}
                  friendships={friendships}
                />
              ))}
            </ul>
            <div className="options-divider" id="user-divider"></div>
          </div>
        );
      }
    

}

export default FriendsPage