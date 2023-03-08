import React, {useContext, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ModalContext } from "../../../App";
import { createChannel } from "../../../store/channel";

const ChannelForm = () => {
    const dispatch = useDispatch();
    const {setIsChannelOpen} = useContext(ModalContext);
    const [name, setChannelName] = useState("")
    const [errors, setErrors] = useState([]);
    const {serverId} = useParams();
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(createChannel({serverId, name}))
            .then(async (channel) => {
                history.push(`/servers/${serverId}/channels/${channel.id}`);
                setIsChannelOpen(false);
            })
            .catch(async(res) => {
                let data;
                try {
                    data = await res.clone.json();
                } catch {
                    data = await res.text();
                }
                if(data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText])
            })
    }


    return (
        <div className="channel-form">
            <form onSubmit={handleSubmit}>
                <div className="channel-form-header">
                    <h2>Create Channel</h2>
                </div>
                <div className="channel-form-inputs">
                    <label htmlFor="name" className="channel-name-label secondary-text" id={errors.length ? "error-label" : undefined}>
                        CHANNEL NAME{" "}
                        <span id={errors.length ? "error-label" : undefined}>
                            {errors.length ? `-Name can't be blank` : ""}
                        </span>
                    </label>
                    <input type="text" name="name" id="name" autoFocus value={name} onChange={(e)=> setChannelName(e.target.value)}/>
                </div>
                <div className="channel-form-footer">
                      <button type="button" id="back-button" onClick={() => setIsChannelOpen(false)}>
                        Back
                      </button>
                      <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )

}

export default ChannelForm