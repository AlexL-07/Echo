import { useDebugValue, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { fetchServer } from "../../store/server"
import { fetchUsers } from "../../store/user"
// import { fetchChannels } from "../../store/channel"
import "./ServerShowPage.css"
import ChannelNav from "./ChannelNav"
import ServerUserList from "./ServerUserList";
import ServerBanner from "./ServerBanner";
import ChannelShowPage from "./ChannelShowPage"
import { fetchChannels, addChannel, removeChannel, clearChannels } from "../../store/channel"
import ServerFormPage from "../ServerNav/ServerFormPage"
import ChannelFormPage from "./ChannelFormPage"
import UserShowModal from "../UserShowModal"
import StatusDropDown from "../UserShowModal/StatusDropDown"
import ServerActionModal from "./ServerBanner/ServerActionsModal"
import ServerInvitePage from "./ServerBanner/ServerInvitePage"
import ChannelEditPage from "./ChannelEditPage"
import ServerEditPage from "./ServerEditPage"
import consumer from "../consumer"

const ServerShowPage = () => {
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();
    const sessionUser = useSelector((store) => store.session.user)
    const server = useSelector((store)=> store.servers[serverId])
    const channels = useSelector((store)=> store.channels)
    const channel = useSelector((store)=>store.channels[channelId])
    const users = useSelector((store) => store.users)
    const [pause, setPause] = useState(true);
    const history = useHistory();
    
    useEffect(() => {
        dispatch(clearChannels());
        dispatch(fetchServer(serverId));
        dispatch(fetchChannels(serverId));
        dispatch(fetchUsers(serverId));
        const subscription = consumer.subscriptions.create(
          { channel: "ServersChannel", id: serverId },
          {
            received: (channelObj) => {
              switch (channelObj.type) {
                case "RECEIVE_CHANNEL":
                  dispatch(addChannel(channelObj));
                  break;
                case "UPDATE_CHANNEL":
                  dispatch(addChannel(channelObj));
                  break;
                case "DESTROY_CHANNEL":
                  dispatch(removeChannel(channelObj.id));
                  if (+channelId === channel.id) {
                    history.push(
                      `/servers/${serverId}/channels/${server.defaultChannel.id}`
                    );
                  }
                  break;
                default:
                  console.log("Unhandled broadcast: ", channelObj.type);
                  break;
              }
            },
          }
        );
        return () => subscription?.unsubscribe();
      }, [dispatch, serverId, channelId]);

    if (!sessionUser) return <Redirect to='/'/>
    if(!channelId){
        return (
            <Redirect to={`/servers/${server.id}/channels/${server.defaultChannel.id}`} />
        )
    } else {
        return(
            <>
            <ServerInvitePage />
            <ServerEditPage />
            <ServerFormPage />
            <ChannelFormPage />
            <ChannelEditPage />
            <UserShowModal />
            <StatusDropDown />
            <ServerActionModal />
            <div className="server-show">
                <div className="server-header">
                    <ServerBanner />
                </div>
                <div className="server-show-components">
                    <div className="channel-navigate">
                        <ChannelNav />
                    </div>
                    <div className="channel-show">
                    
                        <ChannelShowPage />
                    </div>
                    
                    <div className="server-membersship">
                        <ServerUserList users={users}/>
                    </div>
                </div>
            </div>
            </>
        )
    }

    
}

export default ServerShowPage