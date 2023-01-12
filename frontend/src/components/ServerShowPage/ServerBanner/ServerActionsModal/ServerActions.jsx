import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ModalContext } from "../../../../App"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Link, useHistory, useParams } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { deleteServer, removeMembership } from "../../../../store/server";
import EditIcon from '@mui/icons-material/Edit';

const ServerActions = () => {
    const {serverId} = useParams();
    const {setIsServerActionOpen, setIsServerInviteOpen, setIsServerEditOpen} = useContext(ModalContext)
    const dispatch = useDispatch();
    const server = useSelector((store) => store.servers[serverId]);
    const sessionUser = useSelector((store) => store.session.user);
    const history = useHistory()

    const handleDelete = (e) => {
        e.preventDefault();
        history.push(`/channel/@me`);
        setIsServerActionOpen(false);
        return dispatch(deleteServer(serverId))
    }

    const handleLeave = (e) => {
        e.preventDefault();
        history.push(`/channel/@me`);
        setIsServerActionOpen(false);
        return dispatch(removeMembership(serverId, server.users[sessionUser.id].membership_id))
    }

    const editServer = () => {
        if(sessionUser.id === server.owner_id){
            return (
                <div className="server-action-button edit-server" onClick={handleEdit}>
                    <p>Edit Server</p>
                    <EditIcon />
                </div>
            )
        } else {
            return null
        }
    }

    const deleteLeaveServer = () => {
        if(sessionUser.id === server.owner_id){
            return(
                <div className="delete-server-button" onClick={handleDelete}>
                    <p>Delete Server</p>
                    <DeleteForeverIcon />
                </div>      
            )
        } else if (sessionUser.id !== server.owner_id) {
            return(
             <div className="leave-server-button" onClick={handleLeave}>
                 <p>Leave Server</p>
                 <ArrowCircleLeftIcon />
             </div>   
            )
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        setIsServerActionOpen(false)
        setIsServerInviteOpen(true)
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setIsServerActionOpen(false)
        setIsServerEditOpen(true)
    }


    return (
        <div className="server-actions">
            <div className="echo-boost">
                <a
                    href="https://account.venmo.com/u/Alex-Luong-"
                    target="_blank"
                    className="boost-link"
                    noreferrer="true"
                    noopener="true">
                        <p>Echo Boost</p>
                        <p><DiamondIcon/></p>
                </a>
            </div>
            <div className="divider2"></div>
            <div className="server-action-button invite-link" onClick={handleClick}>
                <p>Invite People</p>
                <PersonAddAlt1Icon />
            </div>
            <div className="divider2"></div>
                {editServer()}
            <div className="divider2"></div>
            <div className="delete-leave-server">
                {deleteLeaveServer()}
            </div>
        </div>
    )

}

export default ServerActions