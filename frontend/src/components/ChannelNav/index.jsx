import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
import "./ChannelNav.css"

const ChannelNav = () => {
    const dispatch = useDispatch();
    const channels = useSelector((store) => store.channels);
    const sessionUser = useSelector((store)=> store.session.user);
    const {serverId, channelId} = useParams();

    useEffect(()=>{
        if(sessionUser){
            dispatch(fetchChannels(serverId))
        }
    }, [dispatch, serverId])

    return (
        <div className="channel-nav-container">
            <nav className="channel-nav">
                <p>TEXT CHANNELS</p>
                <ul className="text-channels">
                    {Object.values(channels)?.map((channel)=>(
                        <NavLink to={`/servers/${serverId}/channels/${channel.id}`}>
                            <li><p>{channel.name}</p></li>
                        </NavLink>
                    ))}
                </ul>
                <p>VOICE CHANNELS</p>
                <ul className="voice-channels">
                </ul>
            </nav>
        </div>
    )
}

export default ChannelNav