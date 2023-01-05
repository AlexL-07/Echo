import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchServer } from "../../store/server"

const ServerShowPage = () => {
    const dispatch = useDispatch();
    const serverId = useParams();
    useEffect(()=>{
        dispatch(fetchServer(serverId))
        // dispatch(fetchChannels(serverId))
        // didn't add fetch channels yet
    }, [dispatch, serverId])

    
    return(
        <>
            <h1>This is the Server Show Page</h1>
        </>
    )
    
}

export default ServerShowPage