
import React from "react";
import App from "../App";
import { CompareProvider } from "../context/CompareContext";
import { BookmarkProvider } from "../context/BookmarkContext";
import { SavedToolsProvider } from "../context/SavedToolsContext";

const Index = () => {
  return (
    <React.StrictMode>
      <BookmarkProvider>
        <CompareProvider>
          <SavedToolsProvider>
            <App />
          </SavedToolsProvider>
        </CompareProvider>
      </BookmarkProvider>
    </React.StrictMode>
  );
};

export default Index;
