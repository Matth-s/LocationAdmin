import { NavLink } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const Product = ({ productData }) => {
  console.log(productData);
  const { setDataViewProduct } = useContext(DataContext);

  return (
    <NavLink
      to={`/produit/${productData.id}`}
      className="product-container flex flex__alignCenter flex__column"
      onClick={() => setDataViewProduct(productData)}
    >
      <div className="image-div">
        <img src={productData.imageMain} alt={productData.nom} />
      </div>

      <section>
        <h3>{productData.nom}</h3>
        {productData.disponibilite ? <p>disponible</p> : <p>non disponible</p>}
        <p>{productData.prix}€ / jour</p>
      </section>

      <div className="flex flex__alignCenter button-div">
        <button>Voir plus de détails</button>
        <img src="./assets/right-arrow.svg" alt="fleche" />
      </div>
    </NavLink>
  );
};

export default Product;
