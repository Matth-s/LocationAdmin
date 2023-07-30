import React, { useRef, useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { editMaterial } from "../../firebase/request";
import {
  checkString,
  checkNumber,
  checkImageArray,
} from "../../utils/checkFiled";
import ErrorInputMessage from "../ErrorInputMessage";

const EditMaterialInformation = ({ data, setEdit, files }) => {
  const { setDataViewProduct, editMaterialToData } = useContext(DataContext);
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);

  // État pour les vérifications du formulaire
  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorAcompte, setErrorAcompte] = useState("");
  const [errorPrix, setErrorPrix] = useState("");
  const [errorImages, setErrorImages] = useState("");

  useEffect(() => {
    // Affiche ou masque le champ de date en fonction de la disponibilité
    if (data.disponibilite === true) {
      setShowDateInput(false);
    } else {
      setShowDateInput(true);
    }
  }, []);

  const handleAvailabilityChange = (e) => {
    const value = e.target.value;
    value === "true" ? setShowDateInput(false) : setShowDateInput(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { nom, description, categorie, acompte, prix, disponibilite, date } =
      form.current;

    const convertedPrix = parseFloat(prix.value);
    const convertedAcompte = parseFloat(acompte.value);
    const convertedDisponibilite = disponibilite.value === "true";
    const checkDate = date === undefined ? "" : date.value;

    // Vérification des champs du formulaire
    const checkName = checkString(nom.value);
    setErrorName(checkName);
    const checkDescription = checkString(description.value);
    setErrorDescription(checkDescription);
    const checkAcompte = checkNumber(convertedAcompte);
    setErrorAcompte(checkAcompte);
    const checkPrix = checkNumber(convertedPrix);
    setErrorPrix(checkPrix);
    const checkImage = checkImageArray(files);
    setErrorImages(checkImage);

    const newData = {
      id: data.id,
      nom: nom.value,
      description: description.value,
      categorie: categorie.value,
      acompte: convertedAcompte,
      prix: convertedPrix,
      disponibilite: convertedDisponibilite,
      imageMain: data.imageMain,
      images: data.images,
      date: checkDate,
    };

    if (
      checkName === "" &&
      checkDescription === "" &&
      checkAcompte === "" &&
      checkPrix === "" &&
      checkImage === ""
    ) {
      try {
        // Appel à la fonction d'édition du matériel avec la nouvelle data
        await editMaterial(newData, files, data.id);
        setDataViewProduct(newData);
        setEdit(false);
        editMaterialToData(data.id, newData);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="editMaterialInformation-container">
      {error && <p>{error}</p>}
      {errorImages && errorImages}

      <form ref={form} onSubmit={(e) => handleSubmit(e)}>
        <div className="relative">
          {errorName !== "" && <ErrorInputMessage error={errorName} />}
          <label htmlFor="name">Nom du matériel :</label>
          <input type="text" name="name" id="nom" defaultValue={data.nom} />
        </div>

        <div className="relative">
          {errorDescription && <ErrorInputMessage error={errorDescription} />}
          <label htmlFor="description">Description :</label>
          <textarea
            type="text"
            name="description"
            id="description"
            defaultValue={data.description}
          />
        </div>

        <div className="relative">
          <label htmlFor="categorie">Catégorie :</label>
          <select name="categorie" id="categorie" defaultValue={data.categorie}>
            <option value="outils">Outil</option>
            <option value="vehicule">Véhicule</option>
          </select>
        </div>

        <div className="relative">
          {errorAcompte !== "" && <ErrorInputMessage error={errorAcompte} />}
          <label htmlFor="acompte">Acompte :</label>
          <input
            type="number"
            name="acompte"
            id="acompte"
            defaultValue={data.acompte}
          />
        </div>

        <div className="relative">
          {errorPrix && <ErrorInputMessage error={errorPrix} />}
          <label htmlFor="prix">Prix :</label>
          <input type="number" name="prix" id="prix" defaultValue={data.prix} />
        </div>

        <div className="relative">
          <label htmlFor="disponibilite">Disponibilité :</label>
          <select
            name="disponibilite"
            id="disponibilite"
            defaultValue={data.disponibilite}
            onChange={(e) => handleAvailabilityChange(e)}
          >
            <option value="true">Disponible</option>
            <option value="false">Indisponible</option>
          </select>
        </div>

        {showDateInput && (
          <div>
            <input type="date" name="date" id="date" defaultValue={data.date} />
          </div>
        )}

        <input
          className={isLoading ? "isLoading" : null}
          type="submit"
          value="Enregistrer"
        />
      </form>
    </div>
  );
};

export default EditMaterialInformation;
