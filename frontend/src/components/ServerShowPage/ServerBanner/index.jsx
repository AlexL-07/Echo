import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./ServerBanner.css"
import { useContext, useEffect } from "react";
import { ModalContext } from "../../../App";
import { deleteChannel } from "../../../store/channel";
import { fetchServer } from "../../../store/server";
import { fetchChannel } from "../../../store/channel";

const ServerBanner = () => {
    const dispatch = useDispatch();
    const {setIsServerActionOpen, setIsChannelEditOpen} = useContext(ModalContext)
    const {serverId, channelId} = useParams();
    const server = useSelector((store) => store.servers[serverId]);
    const channel = useSelector((store)=> store.channels[channelId]);
    const sessionUser = useSelector((store) => store.session.user);
    const history = useHistory()

    
    const channelButtons = () => {
        if(sessionUser.id !== server?.owner_id || channel?.name === "general"){
            return null
        } else {
            return(
                <div className="channel-bar-buttons">
                    <div className="channel-delete-button" onClick={handleDelete}>
                        <p><DeleteForeverIcon /></p>
                    </div>
                    <div className="channel-edit-button" onClick={() => {setIsChannelEditOpen(true)}}>
                        <p><EditIcon /></p>
                    </div>
                </div>
            )
        }

    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteChannel(channel))
            .then(history.push(`/servers/${server.id}/channels/${server.defaultChannel.id}`))

    }

    return(
        <>
            <div className="server-banner-container">
                <div className="server-name">
                    <p>{server?.name}</p>
                    <div className="server-dropdown-button" onClick={()=>{setIsServerActionOpen(true)}}>
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                <div className="channel-bar">
                    <div className="banner-channel-name">
                        <p># {channel?.name}</p>
                    </div>
                    {channelButtons()}
                </div>
            </div>
        </>
    )
}

export default ServerBanner