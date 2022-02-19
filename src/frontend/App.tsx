import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingPage from './pages/SettingPage';
import HomePage from './pages/HomePage';
import Root from './pages/Root';
import store from './redux/store';

const App = () => (
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="settings" element={<SettingPage />} />
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Provider>
  </Router>
);

export default App;
