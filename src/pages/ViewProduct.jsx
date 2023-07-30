import React, { useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InformationProduct from "../components/InformationProduct";
import Carrousel from "../components/Carrousel";
import Action from "../components/Action";
import EditMaterial from "../components/editMaterial/EditMaterial";

const ViewProduct = ({ isLoading }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dataViewProduct, data, setDataViewProduct } = useContext(DataContext);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!dataViewProduct.id) {
      if (!isLoading) {
        const getMaterial = data.filter(
          (material) => material.id === parseInt(id)
        );
        if (getMaterial[0] === undefined) {
          setError(true);
        } else {
          setDataViewProduct(getMaterial[0]);
          setError(false);
        }
      }
    }
  }, [dataViewProduct.id, isLoading]);

  return (
    <>
      {error ? (
        <p>Il semblerait que ce matériel n'existe pas</p>
      ) : !dataViewProduct.id ? (
        <p>chargement</p>
      ) : (
        <div className="viewProduct-container">
          <button onClick={() => navigate(-1)}>Retour</button>

          <Action
            genre={dataViewProduct.categorie}
            edit={edit}
            setEdit={setEdit}
            id={dataViewProduct.id}
          />
          <div className="flex">
            {edit ? (
              <>
                <EditMaterial data={dataViewProduct} setEdit={setEdit} />
              </>
            ) : (
              <>
                <Carrousel data={dataViewProduct.images} />
                <InformationProduct data={dataViewProduct} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
