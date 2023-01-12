import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ServerInvite = () => {
    const {serverId} = useParams();
    const server = useSelector((store) => store.servers[serverId]);

    return (
        <div className="server-invite-container">
            <div className="server-invite-header">
                <h2>Invite link to #{server.name}</h2>
                <center>
                    <p>
                        Copy this link and send it to a friend to invite them to join #{server.name}!
                    </p>
                </center>
            </div>
            <div className="server-invite-link">
                <p>{`localhost:3000/invite/${server.invite_key}`}</p>
            </div>

        </div>
    )

}

export default ServerInvite