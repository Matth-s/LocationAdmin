import React, { useState, useContext } from "react";
import { deleteMatarial } from "../firebase/request";
import { DataContext } from "../context/DataContext";

import ModalConfirmDelete from "./modal/ModalConfirmDelete";
import ModalDelete from "./modal/ModalDelete";

const Action = ({ edit, setEdit, id, genre }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { removeMaterialToData } = useContext(DataContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await deleteMatarial(id);
      //delete object to dataContext
      removeMaterialToData(id);
      setShowModalDelete(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"action-container flex"}>
      <button onClick={() => setEdit(!edit)}>
        {edit ? "Annuler" : "Modifier"}
      </button>
      <button
        className={isLoading ? "isLoading" : "null"}
        onClick={() => setShowConfirmDelete(true)}
      >
        Supprimer
      </button>

      {/* show modal confirm delete */}
      {showConfirmDelete && (
        <ModalConfirmDelete
          genre={genre}
          setShowConfirmDelete={setShowConfirmDelete}
          handleDelete={handleDelete}
        />
      )}

      {/* show modal delete */}
      {showModalDelete && <ModalDelete genre={genre} />}
    </div>
  );
};

export default Action;
