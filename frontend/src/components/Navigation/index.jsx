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
                <li><NavLink to="/">Download</NavLink></li>
                <li><NavLink to="/">Nitro</NavLink></li>
                <li><NavLink to="/">Discover</NavLink></li>
                <li><NavLink to="/">Support</NavLink></li>
                <li><NavLink to="/">Careers</NavLink></li>
            </ul>
            <div>
                {sessionLinks}
            </div>
        </div>
    )
}

export default Navigation