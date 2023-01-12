import { useContext} from "react";
import { useDispatch, useSelector } from "react-redux"
import { ModalContext } from "../../../App";
import { updateUser } from "../../../store/user";
import online from "../../../assets/online.png";
import disturb from "../../../assets/red-do-not-disturb.png";
import idle from "../../../assets/idle.png";

const StatusForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((store) => store.session.user)
    const {setIsStatusOpen} = useContext(ModalContext)

    const handleOnline = () => {
        const userData = { ...sessionUser, status: "Online"}
        dispatch(updateUser(userData))
        setIsStatusOpen(false)
    }

    const handleIdle = () => {
        const userData = { ...sessionUser, status: "Idle"}
        dispatch(updateUser(userData))
        setIsStatusOpen(false)
    }

    const handleDnd = () => {
        const userData = { ...sessionUser, status: "Do Not Disturb"}
        dispatch(updateUser(userData))
        setIsStatusOpen(false)
    }


    return (
        <div className="user-status-form">
            <div className="set-status online" onClick={handleOnline}>
                <div className="bubble-status">
                    <img src={online} alt="online-logo" className="status-logo online"/>
                    <p>Online</p>
                </div>
            </div>
            <div className="set-status idle" onClick={handleIdle}>
                <div className="bubble-status">
                    <img src={idle} alt="idle-logo" className="status-logo idle"/>
                    <p>Idle</p>
                </div>
            </div>
            <div className="set-status dnd" onClick={handleDnd}>
                <div className="bubble-status">
                    <img src={disturb} alt="dnd-logo" className="status-logo dnd"/>
                    <p>Do Not Disturb</p>
                </div>
            </div>
        </div>
    )

}

export default StatusForm