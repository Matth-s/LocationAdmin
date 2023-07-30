import React from "react";
import { useNavigate } from "react-router-dom";

const ModalDelete = ({ genre }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {genre === "outil" ? `L'${genre} ` : `Le ${genre} `} a été supprimé
          avec succès !
        </h2>
        <button onClick={() => handleGoHome()}>Revenir a l'accueil</button>
      </div>
    </div>
  );
};

export default ModalDelete;
