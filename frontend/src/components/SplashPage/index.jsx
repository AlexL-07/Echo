// import { useDispatch, useSelector } from "react-redux";
// import * as sessionActions from '../../store/session';
// import { useHistory } from "react-router-dom";
import './SplashPage.css'
import Navigation from "../Navigation";
const SplashPage = () => {
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const sessionUser = useSelector(state => state.session.user)
    // let sessionLinks;
    
    // const logout = (e) => {
    //     e.preventDefault();
    //     dispatch(sessionActions.logout());
    // };

    // const login = (e) => {
    //     e.preventDefault();
    //     history.push('/login')
    // }
    
    // if(sessionUser){
    //     sessionLinks = (
    //         <button onClick={logout}>Log Out</button>
    //     );
    // } else {
    //     sessionLinks = (
    //         <button onClick={login}>Login</button>
    //     )
    // }
    return (
        <>
        <div className="splash-page-banner">
            <Navigation />
        </div>
        </>
    )
}
export default SplashPage