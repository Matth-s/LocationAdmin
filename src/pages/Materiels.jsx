import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../context/DataContext";

import Product from "../components/Product";

const Materiels = ({ isLoading, error }) => {
  const { data } = useContext(DataContext);

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Chargement des données</p>
      ) : error ? (
        <p>Il y a eu une erreur lors de la récupération de données</p>
      ) : data.length > 0 ? (
        <div className="product-container">
          {data.map((item) => (
            <Product key={item.id} productData={item} />
          ))}
        </div>
      ) : (
        <NavLink to={"/ajouter-une-annonce"}>
          <button>Ajouter un nouveau materiel</button>
        </NavLink>
      )}
    </div>
  );
};

export default Materiels;
