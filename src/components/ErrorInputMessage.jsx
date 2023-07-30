import React from "react";

const ErrorInputMessage = ({ error }) => {
  return (
    <div className="errorInputMessage-container flex flex__alignCenter">
      <img src="../assets/icon-error.svg" alt="error" />
      <p>{error}</p>
    </div>
  );
};

export default ErrorInputMessage;
