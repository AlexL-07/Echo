import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([])


    if(sessionUser) return <Redirect to="/channel/@me" />;

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (password === confirmPassword){
            setErrors([]);
            return dispatch(sessionActions.signUp({email, username, password}))
                .catch(async (res) =>{
                    let data; 
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                }) 
        }
        return setErrors(['Confirm Password must be the same as the Password']);
    }
    
    return (
        <div className="form-parent">
            <div className="register-form-container">
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="reg-above-inputs-container">
                        <p>Create an Account</p>
                    </div>
                    <label id="top-label" className="reg-secondary-text">
                        EMAIL{" "}
                        <span id={errors.length && "error-label"}>
                            {errors.length ? ` - ${errors[0]}` : ""}
                        </span>
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="reg-secondary-text">
                        USERNAME{" "}
                        <span id={errors.length && "error-label"}>
                            {errors.length ? ` - ${errors[0]}` : ""}
                        </span>
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="reg-secondary-text">
                        PASSWORD{" "}
                        <span id={errors.length && "error-label"}>
                            {errors.length ? ` - ${errors[0]}` : ""}
                        </span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="reg-secondary-text">
                        CONFIRM PASSWORD{" "}
                        <span id={errors.length && "error-label"}>
                            {errors.length ? ` - ${errors[0]}` : ""}
                        </span>
                    </label>
                    <input
                        type="password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Continue</button>
                    <Link className="login-link" to="/login">
                        Already have an account?
                    </Link>
                </form>
            </div>
        </div>
    );
}


export default SignupFormPage