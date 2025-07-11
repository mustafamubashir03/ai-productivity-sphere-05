
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { BookmarkProvider } from './context/BookmarkContext.tsx'
import { CompareProvider } from './context/CompareContext.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <BookmarkProvider>
          <CompareProvider>
            <App />
          </CompareProvider>
        </BookmarkProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
