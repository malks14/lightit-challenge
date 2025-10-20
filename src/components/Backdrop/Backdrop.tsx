import React from "react";
import ReactDOM from "react-dom";
import "./Backdrop.css";

interface BackdropProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Backdrop = (backdropProps: BackdropProps) => {
  const { onClick } = backdropProps;
  const content = <div className="backdrop" onClick={onClick}></div>;
  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;