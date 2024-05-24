import React, { useState } from "react";
import "./DropArea.css";

const DropArea = ({ onDrop }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onDragEnter={() => setShow(true)}
      onDragLeave={() => {
        setShow(false);
      }}
      onDrop={() => {
        onDrop();
        setShow(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={show ? "drop-area" : "hide-area"}
    >
      Drop here
    </div>
  );
};

export default DropArea;
