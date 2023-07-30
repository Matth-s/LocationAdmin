import React from "react";

const ModalConfirmDelete = ({ handleDelete, setShowConfirmDelete, genre }) => {
  const handleConfirm = (e) => {
    handleDelete(e);
    setShowConfirmDelete(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          Confirmez-vous la suppresssion de{" "}
          {genre === "outil" ? `cet ${genre} ` : `ce ${genre} `} ?
        </h2>
        <button onClick={(e) => handleConfirm(e)}>Confirmer</button>
        <button onClick={() => setShowConfirmDelete(false)}>Annuler</button>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
