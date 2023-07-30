import React from "react";
import { useNavigate } from "react-router-dom";

const ModalCreateMaterial = ({ setShowModal, id, genre }) => {
  const navigate = useNavigate();

  const handleGoViewProduct = () => {
    navigate(`/produit/${id}`);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Le {genre} a été crée avec succès !</h2>
        <button onClick={() => handleGoViewProduct()}>Voir le {genre}</button>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>
  );
};

export default ModalCreateMaterial;
