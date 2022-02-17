import { render } from 'react-dom';
import React from 'react';
import App from './App';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('div#root'),
);
