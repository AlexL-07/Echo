import { useEffect, useRef } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import hashtag from "../../../assets/channel-hashtag.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import consumer from "../../consumer";
import { addDirectMessage, fetchDirectMessages, removeDirectMessage } from "../../../store/direct_message";
import DMItem from "../DMItem";
import DMForm from "../DMForm";



const useChatScroll = (dep) => {
    const ref = useRef(null);
    useEffect(() => {
        if(ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [dep])
    return ref
}

const DMChannel = () => {
    const {dmChannelId} = useParams();
    const dmChannel = useSelector((store) => store.dmChannels[dmChannelId]);
    const messages = useSelector((store) => store.directMessages);
    const dispatch = useDispatch();
    const ref = useChatScroll(messages);

    useEffect(() => {
        dispatch(fetchDirectMessages(dmChannelId));
        const subscription = consumer.subscriptions.create(
            {channel: 'DmChannelsChannel', id: dmChannelId},
            {
                received: (message) => {
                    switch(message.type) {
                        case 'RECEIVE_DIRECT_MESSAGE':
                            dispatch(addDirectMessage(message))
                            break
                        case 'UPDATE_DIRECT_MESSAGE':
                            dispatch(addDirectMessage(message))
                            break
                        case 'DESTROY_DIRECT_MESSAGE':
                            dispatch(removeDirectMessage(message.id))
                            break
                        default:
                            console.log('Unhandled broadcase ', message.type)
                            break;
                    }
                }
            }
        )
        return () => subscription?.unsubscribe();
    }, [dmChannelId, dispatch])

    return (
        <>
            <div className="channel-show-body" ref={ref}>
                <div className="channel-show-header" >
                    <img src={hashtag} alt="hash-tagicon" className="channel-header-hashtag" />
                    <p>{`This is the start of your conversation.`}</p>
                </div>
                <div className="channel-message-index">
                    <div className="messages-body">
                        <ul className="message-body-scroll">
                            { 
                                Object.values(messages)?.map((message) => (
                                    <DMItem message = {message}/>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="channel-message-form-container">
                <DMForm 
                    dmChannel={dmChannel}/>
            </div>
        </>
    )

}




export default DMChannel