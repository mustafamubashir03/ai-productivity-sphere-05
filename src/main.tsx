
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { BookmarkProvider } from './context/BookmarkContext.tsx'
import { CompareProvider } from './context/CompareContext.tsx'
import SEOProvider from './components/common/SEOProvider.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <SEOProvider>
          <BookmarkProvider>
            <CompareProvider>
              <App />
            </CompareProvider>
          </BookmarkProvider>
        </SEOProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
