import React, { useContext } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ModalContext } from "../../../App";
import ChannelForm from "./ChannelForm";
import "./ChannelFormPage.css"

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "320px",
      width: "440px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "5px",
      backgroundColor: "#36393f",
      border: "none"
    },
};
Modal.setAppElement("#root");

const ChannelFormPage = () => {
    const { isChannelOpen, setIsChannelOpen } = useContext(ModalContext);
    const sessionUser = useSelector((store) => store.session.user);
    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <Modal
          isOpen={isChannelOpen}
          onRequestClose={() => setIsChannelOpen(false)}
          style={customStyles}
          contentLabel="Add Channel Modal"
          overlayClassName="Overlay"
          closeTimeoutMS={200}
        >
          <ChannelForm />
        </Modal>
    );
};

export default ChannelFormPage