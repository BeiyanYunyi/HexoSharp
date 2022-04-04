import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';

const root = createRoot(document.querySelector('div#root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
