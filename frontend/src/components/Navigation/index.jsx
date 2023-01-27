import { useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import './Navigation.css'
import full_logo from "../../assets/full_logo_white.png"

const Navigation = () => {
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
            <button onClick={openApp} className="session-button">
                Open Echo
            </button>
        )
    } else {
        sessionLinks = (
            <button onClick={login} className="session-button">
                Login
            </button>
        )
    }

    return (
        <div className='navbar-container'>
            <NavLink to="/"><img src={full_logo} className="logo" alt="full-logo-img"/></NavLink>
            <ul className='nav-bar-links'>
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
    )
}

export default Navigation