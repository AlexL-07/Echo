import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { fetchServer } from "../../store/server"
import "./ServerShowPage.css"

const ServerShowPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const {serverId} = useParams();
    useEffect(()=>{
        dispatch(fetchServer(serverId))
        // dispatch(fetchChannels(serverId))
        // didn't add fetch channels yet
    }, [dispatch, serverId])

    if (!sessionUser) return <Redirect to='/'/>

    return(
        <div className="server-show">
            <h1>Welcome to the Server Show Page</h1>
        </div>
    )
    
}

export default ServerShowPage