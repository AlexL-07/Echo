import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchMessages } from "../../../store/message";
import MessageForm from "./MessageForm"
import "./ChannelShowPage.css"
import logo from "../../../assets/logo_white.png"
import hashtag from "../../../assets/channel-hashtag.png"
const ChannelShowPage = () => {
    const {serverId, channelId} = useParams();
    const channel = useSelector((store) => store.channels[channelId])
    const messages = useSelector((store) => store.messages)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchMessages(serverId, channelId))
    }, [channelId, serverId, dispatch, messages])

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
        if (hours >= 12) {
          hours %= 12;
          meridiem = "PM";
        }
        return `${month}/${date}/${year} ${hours}:${minutes} ${meridiem}`;
      };

    const MessageFormat = () => {
        return (
            <div className="messages-body">
                <ul className="message-body-scroll">
                    {
                        Object.values(messages)?.map((message) => {
                            return (
                                <li className="channel-message" key={message?.id}>
                                    <div className="user-circle" id={message?.author?.id}>
                                        <img src={logo} alt="logo-icon" className="user-logo-icon"/>
                                    </div>
                                    <div className="message-container">
                                        <div className="message-info">
                                            <div className="message-username">{message?.author?.username}</div>
                                            <div className="message-date">{formatMessageDate(message?.created_at)}</div>
                                        </div>
                                        <div className="message-content">
                                            {message.content}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }

    return (
        <>
            <div className="channel-show-header">
                <img src={hashtag} alt="hash-tagicon" className="channel-header-hashtag" />
                <h1>{`Welcome to #${channel?.name}!`}</h1>
                <p>{`This is the start of the #${channel?.name} channel.`}</p>
            </div>
            <div className="channel-message-index">
                <MessageFormat />
                
            </div>
            <div className="channel-message-form-container">
                <MessageForm />
            </div>
        </>
    )

}

export default ChannelShowPage

// {Object.values(messages)?.map((message) => (
//     <p className="message-content" id={message.id}>{message.content}</p>
// ))}