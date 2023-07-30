import React, { createContext, useState } from "react";

const DataContext = createContext({
  data: [],
  dataViewProduct: [],
  setDataViewProduct: () => {},
});

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataViewProduct, setDataViewProduct] = useState({});

  // Function to add an array to the data state
  const addMaterialToData = (material) => {
    setData((prevData) => [...prevData, material]);
  };

  const removeMaterialToData = (id) => {
    setData((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const editMaterialToData = (id, newData) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...newData, id } : item))
    );
  };

  return (
    <DataContext.Provider
      value={{
        data,
        dataViewProduct,
        setDataViewProduct,
        setData,
        addMaterialToData,
        removeMaterialToData,
        editMaterialToData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
