import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './LoginForm.css'
import QRCode from "./QRcode";


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to='/channel/@me'/>

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login({credential, password}))
            .catch(async res => {
                let data; 
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }


    return (
        <>
        <div className="form-parent">
            {/* <button className="home-button">Echo</button> */}
            <div className="form-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="above-inputs-container">
                        <center>
                          <h1 className="above-inputs">Welcome back!</h1>
                        </center>
                        <center>
                          <p className="above-inputs secondary-text">We're so excited to see you again!</p>
                        </center>
                    </div>
                    {/* <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul> */}
                    <label htmlFor="credential" className="secondary-text">
                        USERNAME OR EMAIL <span>*</span>
                    </label>
                    <input
                            type="text"
                            name="credential"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    <label htmlFor="password" className="secondary-text">
                        PASSWORD <span>*</span>
                    </label>
                    <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    <button type="submit">Log In</button>
                    <button onClick={(e) => {
                      e.preventDefault();
                      dispatch(login({ credential: "demo@user.io", password: "password" }));
                    }}>Demo Login</button>
                    <p className="register-link-p secondary-text">
                        Need an account?{" "}
                        <Link className="register-link" to="/register">
                            Register
                        </Link>
                    </p>
                </form>
                <div className="qrcode">
                    <QRCode />
                </div>
            </div>
        </div>
        </>
    );
}



export default LoginFormPage