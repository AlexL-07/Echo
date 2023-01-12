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
        console.log("I am triggered")
        dispatch(fetchServerWithInvite(inviteKey))
            .then((server) => {
                history.push(`/servers/${server.id}`)
            })
    }, [])

    return <></>;


}

export default Invite;