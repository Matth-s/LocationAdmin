import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { createNewMaterial } from "../firebase/request";

import DropZone from "./DropZone";
import ModalCreateMaterial from "./modal/ModalCreateMaterial";

const CreateMaterial = () => {
  const { addMaterialToData, setDataViewProduct } = useContext(DataContext);
  const form = useRef();

  const [files, setFiles] = useState([]);
  const [imageMain, setImageMain] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idMaterial, setIdMaterial] = useState();
  const [genreMaterial, setGenreMaterial] = useState();
  const [showDateInput, setShowDateInput] = useState(false);

  const handleAvailabilityChange = (e) => {
    const value = e.target.value;
    value === "true" ? setShowDateInput(false) : setShowDateInput(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //get from value
    const { prix, categorie, nom, disponibilite, description, acompte, date } =
      form.current;
    const id = Date.now();
    const convertedPrix = parseFloat(prix.value);
    const convertedAcompte = parseFloat(acompte.value);
    const convertedDisponibilite = disponibilite.value === "true";
    const checkDate = date === undefined ? "" : date.value;

    const newObject = {
      id,
      prix: convertedPrix,
      acompte: convertedAcompte,
      categorie: categorie.value,
      nom: nom.value,
      disponibilite: convertedDisponibilite,
      date: checkDate,
      description: description.value,
    };

    try {
      const material = await createNewMaterial(newObject, files);
      setGenreMaterial(categorie.value);
      setIdMaterial(id);
      addMaterialToData(material);
      setDataViewProduct(material);
      setFiles([]);
      setShowModal(true);
      form.current.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="createMaterial-container flex flex__column"
        ref={form}
        onSubmit={(e) => handleSubmit(e)}
      >
        {/*nom du materiel */}
        <div>
          <label htmlFor="nom">Nom du materiel</label>
          <input type="text" name="nom" id="nom" />
        </div>

        {/*description du materiel */}
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" />
        </div>

        {/*categorie du materiel */}
        <div>
          <label htmlFor="categorie">Categorie</label>
          <select name="categorie" id="categorie">
            <option value="outil">Outil</option>
            <option value="vehicule">Vehicule</option>
          </select>
        </div>

        {/*prix du materiel */}
        <div>
          <label htmlFor="prix">Prix</label>
          <input type="number" name="prix" id="prix" />
        </div>

        {/*acompte du materiel */}
        <div>
          <label htmlFor="acompte">Acompte</label>
          <input type="number" name="acompte" id="acompte" />
        </div>

        {/*disponiblite du materiel */}
        <div>
          <label htmlFor="disponibilite">Disponibilité</label>
          <select
            name="disponibilite"
            id="disponibilite"
            onChange={(e) => handleAvailabilityChange(e)}
          >
            <option value="true">Disponible</option>
            <option value="false">Indisponible</option>
          </select>
        </div>

        {/* selectionner une date */}
        {showDateInput && (
          <div>
            <label htmlFor="date">Date de disponibilité</label>
            <input type="date" name="date" id="date" />
          </div>
        )}

        {/* image a selectionner */}
        <DropZone
          setFiles={setFiles}
          files={files}
          setImageMain={setImageMain}
        />

        <input
          className={isLoading ? "isLoading" : null}
          type="submit"
          value="Envoyer"
        />
      </form>

      {showModal && (
        <ModalCreateMaterial
          setShowModal={setShowModal}
          id={idMaterial}
          genre={genreMaterial}
        />
      )}
    </>
  );
};

export default CreateMaterial;
