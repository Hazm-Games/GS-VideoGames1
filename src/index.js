import React, {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import { Routes, Route, useLocation, HashRouter } from 'react-router-dom';













const root = createRoot(document.querySelector('#root'));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
