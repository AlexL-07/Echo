import React, {useContext} from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ModalContext } from "../../../App";
import StatusForm from "./StatusForm";
import "./StatusDropDown.css"

const customStyles = {
    content: {
      top: "80%",
      left: "30%",
      right: "auto",
      bottom: "auto",
      height: "250px",
      width: "340px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "5px",
      backgroundColor: "#18191C",
      border: "none"
    },
};

Modal.setAppElement("#root");

const StatusDropDown = () => {
  const {isStatusOpen, setIsStatusOpen} = useContext(ModalContext)
  const sessionUser = useSelector((store) => store.session.user)
  if(!sessionUser) return <Redirect to="/login"/>;
  return (
    <Modal
          isOpen={isStatusOpen}
          onRequestClose={() => setIsStatusOpen(false)}
          style={customStyles}
          contentLabel="User Modal"
          overlayClassName="Overlay"
          closeTimeoutMS={200}
        >
          <StatusForm />
        </Modal>

  )

}

export default StatusDropDown