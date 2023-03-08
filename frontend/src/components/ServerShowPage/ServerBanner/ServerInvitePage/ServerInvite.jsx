import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../../../App";

const ServerInvite = () => {
    const {serverId} = useParams();
    const server = useSelector((store) => store.servers[serverId]);
    const {setIsServerInviteOpen} = useContext(ModalContext);

    return (
        <div className="server-invite-container">
            <div className="server-invite-header">
                <center>
                <h2>Invite link to #{server.name}</h2>
                <p>
                    Copy this link and send it to a friend to invite them to join #{server.name}!
                </p>
                </center>
            </div>
            <div className="server-invite-link">
                <p>{`echo-cbwl.onrender.com/invite/${server.invite_key}`}</p>
            </div>
            <div className="channel-form-footer">
                <button type="button" id="back-button" onClick={() => setIsServerInviteOpen(false)}>
                    Back
                </button>
            </div>
        </div>
    )

}

export default ServerInvite