import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createMessage } from "../../../../store/message";
import "./MessageForm.css"

const MessageForm = () => {
    const [body, setBody] = useState("");
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const channel = useSelector((store) => store.channels[channelId])

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = {content: body}
        dispatch(createMessage(channelId, message))
        setBody("");
    }

    return(
        <div className="message-form-container">
            <form className="message-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.currentTarget.value)}
                    placeholder={`Message #${channel?.name}`}/>
            </form>
        </div>
    )

}

export default MessageForm