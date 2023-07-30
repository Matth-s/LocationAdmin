import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { DataContextProvider } from "./context/DataContext";
import { getAllMateriel } from "./firebase/request";
import { DataContext } from "./context/DataContext";

import Materiels from "./pages/Materiels";
import Advertisement from "./pages/Advertisement";
import ViewProduct from "./pages/ViewProduct";

import Header from "./components/Header";

function App() {
  return (
    <DataContextProvider>
      <AppContent />
    </DataContextProvider>
  );
}

function AppContent() {
  const { setData } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await getAllMateriel();
        setData(request);
        setError(false);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setData]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Materiels isLoading={isLoading} error={error} />}
        />
        <Route path="/ajouter-une-annonce" element={<Advertisement />} />
        <Route
          path="/produit/:id"
          element={<ViewProduct isLoading={isLoading} error={error} />}
        />
      </Routes>
    </>
  );
}

export default App;
