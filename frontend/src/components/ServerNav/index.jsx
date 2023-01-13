import React, {useContext, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {fetchServers} from "../../store/server";
import logo from "../../assets/logo_white.png"
import ExploreIcon from '@mui/icons-material/Explore';
import "./ServerNav.css"
import { ModalContext } from "../../App";

const ServerNav = () => {
    const { setIsOpen } = useContext(ModalContext)
    const dispatch = useDispatch();
    const servers = useSelector((store) => store.servers)
    const sessionUser = useSelector((store) => store.session.user)
    const location = useLocation()

    useEffect(()=>{
        if(sessionUser){
            dispatch(fetchServers())
        }
    }, [dispatch, sessionUser]);

    if (location.pathname === '/' || location.pathname === '/error'){
        return null
    } else {
        return (
            <>
                {sessionUser && (
                    <div className="nav-bar">
                        <nav className="server-nav-bar">
                            <ul className="server-circles">
                                <NavLink to="/channel/@me" className="server-circle purple">
                                    <li>
                                        <img src={logo} alt="logo" className="logo-icon-server" />
                                        <div className="pop-out">
                                            <h4 className="pop-text">Home</h4>
                                        </div>
                                    </li>
                                </NavLink> 
                                <li className="divider"> </li> 
                                {Object.values(servers)?.map((server) => (
                                    <NavLink to={`/servers/${server.id}`} key={server.id} className="server-circle purple">
                                        <li>
                                            <p>{server.name[0]}</p>
                                            <div className="pop-out">
                                                <h4 className="pop-text">{server.name}</h4>
                                            </div>
                                        </li>
                                    </NavLink>
                                ))}
                                <li className="server-circle green" onClick={() => {setIsOpen(true)}}>
                                    <p className="plus-browse-minus">+</p>
                                    <div className="pop-out">
                                        <h4 className="pop-text">Add Server</h4>
                                    </div>
                                </li>
                                <li className="server-circle green">
                                    <p className="browse"><ExploreIcon /></p>
                                    <div className="pop-out">
                                        <h4 className="pop-text">Explore Public Servers</h4>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </>
        )
    }
}

   

export default ServerNav