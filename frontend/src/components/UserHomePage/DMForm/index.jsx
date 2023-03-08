import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createDirectMessage } from "../../../store/direct_message";

const DMForm = ({dmChannel}) => {
    const [body, setBody] = useState("");
    const {dmChannelId}= useParams();
    const dispatch = useDispatch();
    // const dmChannel = useSelector((store) => store.dmChannels[dmChannelId])

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = {content: body};
        dispatch(createDirectMessage(dmChannelId, message));
        setBody("")
    }

    return(
        <div className="dm-message-form-container">
            <form className="message-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.currentTarget.value)}
                    placeholder={`Message @${dmChannel?.dm_user.username}`}/>
            </form>
        </div>
    )


}

export default DMForm