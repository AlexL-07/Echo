import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../../../App";
import { updateMessage } from "../../../../store/message";

const MessageEditForm = (message) => {
    const [body, setBody] = useState(message.content);
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const {setMsgEdit} = useContext(ModalContext);

    const newMessage = {id: message.id, author_id: message.author_id, content: body, message_location_id: message.message_location_id }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateMessage(serverId, channelId, newMessage));
    }
    const handleCloseEdit = (e) => {
        if (e.keyCode === 27) {
          setMsgEdit(false);
          setMsgInput(message.body);
        }
      };

    return(
        <form className="edit-message-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="content"
                id="message"
                autoComplete="off"
                autoFocus
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onKeyDown={handleCloseEdit}
              />
              <p className="msg-edit-info">
                escape to{" "}
                <span
                  onClick={() => {
                    setMsgEdit(false);
                    setBody(message.body);
                  }}
                >
                  cancel
                </span>{" "}
                &bull; enter to <span onClick={handleSubmit}>save</span>
              </p>
            </form>

    )
}

export default MessageEditForm