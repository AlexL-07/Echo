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
        <div className='splash-page-main'>
            <div className="splash-page-banner">
                <div className='navigation-bar'>
                    <Navigation />
                </div>
                <div className='under-nav-bar'>
                <h1 className="homepage-main-heading">IMAGINE A PLACE...</h1>
                    <p>
                      ...where you can belong to a school club, a gaming group, or a
                      worldwide art community. Where just you and a handful of friends can
                      spend time together. A place that makes it easy to talk every day
                      and hang out more often.
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}
export default SplashPage