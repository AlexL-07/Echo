import { useContext } from "react"
import { useSelector } from "react-redux"
import { ModalContext } from "../../App"

const UserShow = () => {
    const {setIsUserOpen} = useContext(ModalContext)
    const sessionUser = useSelector((store) => store.session.user)

    const formatDate = (timestamp) => {
        let dateObj = new Date(timestamp);
        let dateStr = dateObj.toString();
        let date = dateStr.substring(4,7)
        let month = dateObj.substring(8,10)
        let year = dateObj.substring(11, 15);


    }

    return (
        <div className="user-show-container">
            <div className="user-header-container">

            </div>
            <div className="user-info-container">
                <div className="username-usertag">
                    <h3>{sessionUser.username}#{sessionUser.user_tag}</h3>
                </div>
                <div className="member-since">
                    <p>ECHO MEMBER SINCE</p>
                    <p></p>

                </div>
                <div className="status-form-container">

                </div>
            </div>
        </div>
    )

}
export default UserShow