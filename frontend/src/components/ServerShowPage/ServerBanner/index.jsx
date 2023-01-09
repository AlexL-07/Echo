import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import "./ServerBanner.css"

const ServerBanner = () => {
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();
    const server = useSelector((store) => store.servers[serverId]);
    const channel = useSelector((store)=> store.channels[channelId])

    return(
        <>
            <div className="server-banner-container">
                <div className="server-name">
                    <p>{server?.name}</p>
                </div>
                <div className="channel-bar">
                    <div className="banner-channel-name">
                        <p># {channel?.name}</p>
                    </div>
                    <div className="channel-bar-buttons">
                        <p><NotificationsIcon /></p>
                        <p><PushPinIcon /></p>
                        <p><EditIcon /></p>
                        <p>Search Bar</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServerBanner