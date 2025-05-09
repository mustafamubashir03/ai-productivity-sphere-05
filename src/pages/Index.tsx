
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import App from "../App";

const Index = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

export default Index;
