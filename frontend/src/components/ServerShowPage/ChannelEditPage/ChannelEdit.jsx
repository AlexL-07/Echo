import React, {useContext, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ModalContext } from "../../../App";
import { updateChannel } from "../../../store/channel";
const ChannelEdit = () => {
    const dispatch = useDispatch();
    const {setIsChannelEditOpen} = useContext(ModalContext);
    const {serverId, channelId} = useParams();
    const channel = useSelector((store) => store.channels[channelId]);
    const [name, setChannelName] = useState(channel.name);

    const editedChannel = {id: channel.id, server_id: serverId, name: name}

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateChannel(editedChannel));
        setIsChannelEditOpen(false);
        setChannelName("")
    }

    return (
        <div className="channel-form">
            <form onSubmit={handleSubmit}>
                <div className="channel-form-header">
                    <h2>Edit Channel</h2>
                </div>
                <div className="channel-form-inputs">
                    <label htmlFor="name" className="channel-name-label secondary-text">
                        CHANNEL NAME
                    </label>
                    <input type="text" name="name" id="name" placeholder={channel.name} autoFocus value={name} onChange={(e)=> setChannelName(e.target.value)}/>
                </div>
                <div className="channel-form-footer">
                      <button type="button" id="back-button" onClick={() => setIsChannelEditOpen(false)}>
                        Back
                      </button>
                      <button type="submit">Edit</button>
                </div>
            </form>
        </div>
    )



}

export default ChannelEdit