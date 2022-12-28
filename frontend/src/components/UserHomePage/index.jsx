import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Redirect } from "react-router-dom";
const UserHomePage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) return <Redirect to='/'/>
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };
    return (
        <>
            <h1>Welcome to the User's Home Page</h1>
            <button onClick={logout}>Log Out</button>
        </>
    )
}
export default UserHomePage