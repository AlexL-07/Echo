import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import logo from "../../../../assets/logo_white.png"
import { updateMessage, deleteMessage } from "../../../../store/message";

const MessageItem = ({message}) => {
    const [msgCrudActive, setMsgcrudActive] = useState(false);
    const [hovered, setHovered] = useState(false)
    const [msgEdit, setMsgEdit] = useState(false);
    const [body, setBody] = useState(message?.body);
    const sessionUser = useSelector((store) => store.session.user);
    // const hidden = { opacity: 0 };
    // const active = { opacity: 1 };
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();

    const newMessage = {id: message.id, author_id: message.author_id, content: body, message_location_id: message.message_location_id }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateMessage(serverId, channelId, newMessage));
        setMsgEdit(false);
    }
    
    const handleCloseEdit = (e) => {
      if (e.keyCode === 27) {
        setMsgEdit(false);
        setBody(message.body);
      }
    };

    const MessageUpdateDelete = (message) => {
        if(message.author_id === sessionUser.id){
            return(
                <div className="message-ud">
                    <div className="message-edit-button" onClick={() => {setMsgEdit(true)}}><EditIcon /></div>
                    <div className="message-delete-button" onClick={()=>handleMessageDelete(message.id)}><DeleteForeverIcon /></div>
                </div>
            )
        } else {
            return null
        }
    }

    const handleMessageDelete = (messageId) => {
        return dispatch(deleteMessage(serverId, channelId, messageId))
    }

    const authorStatus = () => {
      if(message.author.status === "Do Not Disturb"){
        return ("dnd");
    } else {
        return (message.author.status.toLowerCase())
    }
    }

    const formatMessageDate = (timestamp) => {
        let dateObj = new Date(timestamp);
        let date = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let meridiem = "AM";
        if (date < 10) {
          date = "0" + date;
        }
        if (month < 10) {
          month = "0" + month;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (hours > 12) {
          hours %= 12;
          meridiem = "PM";
        }
        return `${month}/${date}/${year} ${hours}:${minutes} ${meridiem}`;
      };

    return(
        <>
        <li className="channel-message" key={message?.id} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div className="message-body-container">
                <div className="message-user-circle" id={authorStatus()}>
                    <img src={logo} alt="logo-icon" className="logo-icon"/>
                </div>
                <div className="message-container">
                    <div className="message-info">
                        <div className="message-username">{message?.author?.username}</div>
                        <div className="message-date">{formatMessageDate(message?.created_at)}</div>
                    </div>
                    {msgEdit ? (
                      <div className="edit-message-form-container">
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
                      </div>
                        ) : (
                            <div className="message-content">
                                {message.content}
                            </div>
                        )
                    } 
                </div>
            </div>
            <div className="message-crud-buttons" id={hovered ? "show-element" : undefined}>
              {MessageUpdateDelete(message)}
            </div>
        </li>
        </>
    )



}

export default MessageItem