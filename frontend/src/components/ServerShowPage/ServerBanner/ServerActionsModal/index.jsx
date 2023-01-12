import Modal from "react-modal";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ModalContext } from "../../../../App";
import ServerActions from "./ServerActions";
import "./ServerActionModal.css"

const customStyles = {
    content: {
      top: "15%",
      left: "17%",
      right: "auto",
      bottom: "auto",
      height: "160px",
      width: "220px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "5px",
      backgroundColor: "#36393f",
      border: "none"
    },
};

Modal.setAppElement("#root");
const ServerActionModal = () => {
    const {isServerActionOpen, setIsServerActionOpen} = useContext(ModalContext)
    const sessionUser = useSelector((store) => store.session.user)
    if(!sessionUser) return <Redirect to="/login"/>;
    return(
        <Modal
          isOpen={isServerActionOpen}
          onRequestClose={() => setIsServerActionOpen(false)}
          style={customStyles}
          contentLabel="Server Action Modal"
          overlayClassName="Overlay"
          closeTimeoutMS={200}
        >
            <ServerActions />
        </Modal>

    )

}

export default ServerActionModal