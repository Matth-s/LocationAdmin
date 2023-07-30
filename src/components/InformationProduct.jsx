import React, { useState } from "react";

const InformationProduct = ({ data }) => {
  return (
    <section className="informationProduct-container">
      <h2>{data.nom}</h2>
      <p>{data.description}</p>
      <p className="price">Acompte : {data.acompte} €</p>
      <p className="price">À partir de : {data.prix}€ / jour</p>
    </section>
  );
};

export default InformationProduct;
