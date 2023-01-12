import React, {useContext, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../../App";
import LockIcon from '@mui/icons-material/Lock';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import formSwitch from '@mui/material/Switch';
import { updateServer } from "../../../store/server";
const ServerEdit = () => {
    const dispatch = useDispatch()
    const {setIsServerEditOpen} = useContext(ModalContext);
    const {serverId} = useParams();
    const server = useSelector((store) => store.servers[serverId])
    const [name, setServerName] = useState(server.name)
    const [isPublic, setIsPublic] = useState(server.is_public);
    const [checked, setChecked] = useState(false);
    const sessionUser = useSelector((store) => store.session.user)

    useEffect(()=>{
        checkIsPublic();
    }, [])

    const checkIsPublic = () => {
        if(isPublic){
            setChecked(false)
        } else {
            setChecked(true)
        }
    }

    const GreenSwitch = styled(formSwitch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: green[600],
          '&:hover': {
            backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: green[600],
        },
      }));

    const editedServer = {id: serverId, name, isPublic}

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateServer(editedServer));
        setIsServerEditOpen(false);
        setServerName("");

    }
    const label = { inputProps: { 'aria-label': 'Switch' } }

    const handleChange = (e) => {
        e.preventDefault();
        setChecked(e.target.checked)
        if (e.target.checked === false){
            setIsPublic(true)
        } else if (e.target.checked === true) {
            setIsPublic(false)
        }
    }

    return (
        <div className="server-form">
            <form onSubmit={handleSubmit}>
                <div className="server-form-header">
                    <h2>Edit your server</h2>
                    <center>
                        <p>
                            Give your server a personality with a name. You can always change it later.
                        </p>
                    </center>
                </div>
                <div className="server-form-inputs">
                    <label htmlFor="name" className="server-name-label secondary-text">
                        SERVER NAME
                    </label>
                    <input type="text" name="name" id="name" placeholder={server?.name} autoFocus value={name} onChange={(e)=> setServerName(e.target.value)}/>
                </div>
                <div className="switch-container">
                    <div className="switch-top">
                        <p><LockIcon fontSize="small"/>Private Server</p>
                        <GreenSwitch
                        checked={checked}
                        onChange={handleChange} 
                        {...label} defaultChecked />
                    </div>
                    <div className="switch-bottom">
                        <p>Users have to be invited to join this server.</p>
                    </div>

                </div>
                <div className="server-form-footer">
                      <button type="button" id="back-button" onClick={() => setIsServerEditOpen(false)}>
                        Back
                      </button>
                      <button type="submit">Edit</button>
                </div>
            </form>
        </div>
    )

}

export default ServerEdit