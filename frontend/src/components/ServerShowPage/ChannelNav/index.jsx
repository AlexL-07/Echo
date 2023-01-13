import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom";
import { fetchChannels } from "../../../store/channel";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AddIcon from '@mui/icons-material/Add';
import "./ChannelNav.css"
import { ModalContext } from "../../../App";

const ChannelNav = () => {
    const dispatch = useDispatch();
    const channels = useSelector((store) => store.channels);
    const sessionUser = useSelector((store)=> store.session.user);
    const {serverId} = useParams();
    const {setIsChannelOpen} = useContext(ModalContext)

    // if(sessionUser){
        
    // }
    
    useEffect(()=>{
        dispatch(fetchChannels(serverId))
    }, [dispatch, serverId])

    return (
        <div className="channel-nav-container">
            <nav className="channel-nav">
                <div className="channel-title-container">
                    <p className="top-channel-text">TEXT CHANNELS</p>
                    <button className="channel-add-button" onClick={setIsChannelOpen}>
                        <AddIcon fontSize="small"/>
                    </button>
                </div>
                <ul className="channel-links-container text">
                    {Object.values(channels)?.map((channel)=>(
                        <NavLink to={`/servers/${serverId}/channels/${channel.id}`} key={channel.id} className="channel-name">
                            <li><p># {channel.name}</p></li>
                        </NavLink>
                    ))}
                </ul>
                <p className="top-channel-text">VOICE CHANNELS</p>
                <ul className="channel-links-container voice">
                    <li className="channel-name"><p><VolumeUpIcon fontSize="small"/> coming eventually</p></li>
                </ul>
            </nav>
        </div>
    )
}

export default ChannelNav