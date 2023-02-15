import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { addMessage, fetchMessages, removeMessage } from "../../../store/message";
import MessageForm from "./MessageForm"
import "./ChannelShowPage.css"
import logo from "../../../assets/logo_white.png"
import hashtag from "../../../assets/channel-hashtag.png"
import consumer from "../../consumer";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteMessage } from "../../../store/message";
import EditIcon from '@mui/icons-material/Edit';
import { ModalContext } from "../../../App";
import MessageEditForm from "./MessageEditForm";
import MessageItem from "./MessageItem";


const useChatScroll = (dep) => {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);
    return ref;
}

const ChannelShowPage = () => {
    const {serverId, channelId} = useParams();
    const channel = useSelector((store) => store.channels[channelId]);
    const messages = useSelector((store) => store.messages);
    const sessionUser = useSelector((store) => store.session.user);
    const dispatch = useDispatch();
    const ref = useChatScroll(messages);
    const server = useSelector((store) => store.servers[serverId]);

    useEffect(()=>{
        dispatch(fetchMessages(serverId, channelId));
        const subscription = consumer.subscriptions.create(
            {channel: 'ChannelsChannel', id: channelId},
            {
                received: (message) => {
                    switch(message.type) {
                        case 'RECEIVE_MESSAGE':
                            dispatch(addMessage(message))
                            break
                        case 'UPDATE_MESSAGE':
                            dispatch(addMessage(message))
                            break;
                        case 'DESTROY_MESSAGE':
                            dispatch(removeMessage(message.id))
                        default:
                            console.log('Unhandled broadcast ', message.type)
                            break;
                    }
                }
            }
        )
        return () => subscription?.unsubscribe();
    }, [channelId, dispatch])


    return (
        <>
            <div className="channel-show-body" ref={ref}>
                <div className="channel-show-header" >
                    <img src={hashtag} alt="hash-tagicon" className="channel-header-hashtag" />
                    <h1>{`Welcome to #${channel?.name}!`}</h1>
                    <p>{`This is the start of the #${channel?.name} channel.`}</p>
                </div>
                <div className="channel-message-index">
                    {/* <MessageFormat /> */}
                    <div className="messages-body">
                        <ul className="message-body-scroll">
                            { 
                                Object.values(messages)?.map((message) => (
                                    <MessageItem message = {message}/>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="channel-message-form-container">
                <MessageForm />
            </div>
        </>
    )

}

export default ChannelShowPage
