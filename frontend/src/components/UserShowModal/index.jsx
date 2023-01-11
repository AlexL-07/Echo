import React, {useContext} from "react";
import Modal from "react-modal";
import { ModalContext } from "../../App";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import UserShow from "./UserShow";
import "./UserShowModal.css"

const customStyles = {
    content: {
      top: "80%",
      left: "10%",
      right: "auto",
      bottom: "auto",
      height: "370px",
      width: "340px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "5px",
      backgroundColor: "#36393f",
      border: "none"
    },
};
const UserShowModal = () => {
    const {isUserOpen, setIsUserOpen} = useContext(ModalContext)
    const sessionUser = useSelector((store) => store.session.user);
    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <Modal
          isOpen={isUserOpen}
          onRequestClose={() => setIsUserOpen(false)}
          style={customStyles}
          contentLabel="User Modal"
          overlayClassName="Overlay"
          closeTimeoutMS={200}
        >
          <UserShow />
        </Modal>
    );


}

export default UserShowModal
