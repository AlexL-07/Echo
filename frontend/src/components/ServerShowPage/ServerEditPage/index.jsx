import React, { useContext } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { ModalContext } from "../../../App";
import ServerEdit from "./ServerEdit";
import "./ServerEditPage.css";

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

const ServerEditPage = () => {
  const { isServerEditOpen, setIsServerEditOpen } = useContext(ModalContext);
  const sessionUser = useSelector((store) => store.session.user);
  if (!sessionUser) return <Redirect to="/login" />;
  return (
    <Modal
      isOpen={isServerEditOpen}
      onRequestClose={() => setIsServerEditOpen(false)}
      style={customStyles}
      contentLabel="Edit Server Modal"
      overlayClassName="Overlay"
      closeTimeoutMS={200}
    >
      <ServerEdit/>
    </Modal>
  );
};

export default ServerEditPage