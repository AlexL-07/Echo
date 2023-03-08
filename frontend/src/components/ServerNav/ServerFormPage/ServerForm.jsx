import React, {useContext, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ModalContext } from "../../../App";
import { createServer } from "../../../store/server";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./ServerFormPage.css"
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import formSwitch from '@mui/material/Switch';
const ServerForm = () => {
    const dispatch = useDispatch();
    const {setIsOpen} = useContext(ModalContext);
    const [name, setServerName] = useState("");
    const [checked, setChecked] = useState(true);
    const [isPublic, setIsPublic] = useState(false);
    const [errors, setErrors] = useState([]);
    const {serverId} = useParams();
    const server = useSelector((store) => store.servers[serverId])
    const history = useHistory();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(createServer({name, isPublic}))
            .then(async (server) => {
                history.push(`/servers/${server.id}/channels/${server.defaultChannel.id}`);
                setIsOpen(false);
            })
            .catch(async(res) => {
                let data;
                try {
                    data = await res.clone.json();
                } catch {
                    data = await res.text();
                }
                if(data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText])
            })
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
                    <h2>Customize your server</h2>
                    <center>
                        <p>
                            Give your server a personality with a name. You can always change it later
                        </p>
                    </center>
                </div>
                <div className="server-form-inputs">
                    <label htmlFor="name" className="server-name-label secondary-text" id={errors.length ? "error-label" : undefined}>
                        SERVER NAME{" "}
                        <span id={errors.length ? "error-label" : undefined}>
                            {errors.length ? `-Name can't be blank` : ""}
                        </span>
                    </label>
                    <input type="text" name="name" id="name" autoFocus value={name} onChange={(e)=> setServerName(e.target.value)}/>
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
                      <button type="button" id="back-button" onClick={() => setIsOpen(false)}>
                        Back
                      </button>
                      <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )

}
export default ServerForm