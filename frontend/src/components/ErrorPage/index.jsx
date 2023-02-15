// import Navigation from "../Navigation"
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import ErrorGif from "../../assets/wrongturn.gif"
import full_logo from "../../assets/full_logo.png"
import "./ErrorPage.css"
const ErrorPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    let sessionLinks;

    const login = (e) => {
        e.preventDefault();
        history.push('/login')
    }

    const openApp = (e) => {
        e.preventDefault();
        history.push("/channel/@me")
    }

    if (sessionUser) {
        sessionLinks = (
            <button onClick={openApp} className="error-session-button">
                Open Echo
            </button>
        )
    } else {
        sessionLinks = (
            <button onClick={login} className="error-session-button">
                Login
            </button>
        )
    }
    return (
        <>
            <div className='error-navbar-container'>
                <NavLink to="/"><img src={full_logo} className="error-logo" alt="full-logo-img"/></NavLink>
                <ul className='error-nav-bar-links'>
                <li>
                    <a
                        href='https://www.linkedin.com/in/alex-luong-15b488183/'
                        target="_blank">
                            LinkedIn
                    </a>
                </li>
                <li>
                        <a
                            href='https://github.com/AlexL-07'
                            target="_blank">
                                GitHub
                        </a>
                </li>
                <li><NavLink to="/">Portfolio</NavLink></li>
                </ul>
                <div>
                    {sessionLinks}
                </div>
            </div>
            <div className="error-body">
                {/* <Navigation /> */}
                <h1>Wrong Turn</h1>
                <img src={ErrorGif} alt="error-gif" className='errorgif'/>
            </div>
        </>
    )

}

export default ErrorPage