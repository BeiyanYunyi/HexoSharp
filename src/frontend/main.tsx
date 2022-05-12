import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.querySelector('div#root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
