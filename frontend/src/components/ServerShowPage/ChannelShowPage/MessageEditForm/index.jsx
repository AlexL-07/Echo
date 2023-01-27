import { useState } from "react"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateMessage } from "../../../../store/message";

const MessageEditForm = (message) => {
    const [body, setBody] = useState(message.content);
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();

    const newMessage = {id: message.id, author_id: message.author_id, content: body, message_location_id: message.message_location_id }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateMessage(serverId, channelId, newMessage));
        setBody("")
    }

    return(
        <div className="message-form-container">
        <form className="message-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                value={body}
                onChange={(e) => setBody(e.currentTarget.value)}
                placeholder={body}/>
        </form>
    </div>

    )
}