import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { fetchServer } from "../../store/server"
// import { fetchChannels } from "../../store/channel"
import "./ServerShowPage.css"
import ChannelNav from "./ChannelNav"
import ServerUserList from "./ServerUserList";
import ServerBanner from "./ServerBanner";
import ChannelShowPage from "./ChannelShowPage"
import { fetchChannels } from "../../store/channel"
import ServerFormPage from "../ServerNav/ServerFormPage"
import ChannelFormPage from "./ChannelFormPage"
import UserShowModal from "../UserShowModal"
import StatusDropDown from "../UserShowModal/StatusDropDown"
import ServerActionModal from "./ServerBanner/ServerActionsModal"
import ServerInvite from "./ServerBanner/ServerInvitePage/ServerInvite"
import ServerInvitePage from "./ServerBanner/ServerInvitePage"

const ServerShowPage = () => {
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();
    const sessionUser = useSelector((store) => store.session.user)
    const server = useSelector((store)=> store.servers[serverId])
    const channels = useSelector((store)=> store.channels)
    const channel = useSelector((store)=>store.channels[channelId])
    const [pause, setPause] = useState(true);
    useEffect(()=>{
        dispatch(fetchServer(serverId))
        .then(()=>{
            setPause(false)
        })
        // dispatch(fetchChannels(serverId))
        // didn't add fetch channels yet
    }, [dispatch, serverId])

    if (!sessionUser) return <Redirect to='/'/>
    if(!channelId){
        return (
            !pause && <Redirect to={`/servers/${server.id}/channels/${server.defaultChannel.id}`} />
        )
    } else {
        return(
            <>
            <ServerInvitePage />
            <ServerFormPage />
            <ChannelFormPage />
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
                        <ServerUserList />
                    </div>
                </div>
            </div>
            </>
        )
    }

    
}

export default ServerShowPage