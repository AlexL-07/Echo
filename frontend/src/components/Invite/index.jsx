import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchServerWithInvite } from "../../store/server";

const Invite = () => {
    const [pause, setPause] = useState(true);
    const dispatch = useDispatch();
    const {inviteKey} = useParams();
    const history = useHistory();

    useEffect(() => {
        const pendingInvite = setTimeout(() => {
            dispatch(fetchServerWithInvite(inviteKey))
                .then((server) => {
                    history.push(`/servers/${server.id}/channels/${server.defaultChannel.id}`)
                })
        }, 1000)
        return () => clearTimeout(pendingInvite);
    }, [])

    return <></>;


}

export default Invite;