import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner animation="grow" />
    </div>
  );
};

export default Loading;
