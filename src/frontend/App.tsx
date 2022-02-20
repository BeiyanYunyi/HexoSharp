import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingPage from './pages/SettingPage';
import HomePage from './pages/HomePage';
import Root from './pages/Root';
import store from './redux/store';
import LoginPage from './pages/LoginPage';
import NeedAuth from './components/NeedAuth';

const App = () => (
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="settings"
            element={
              <NeedAuth>
                <SettingPage />
              </NeedAuth>
            }
          />
          <Route
            index
            element={
              <NeedAuth>
                <HomePage />
              </NeedAuth>
            }
          />
        </Route>
      </Routes>
    </Provider>
  </Router>
);

export default App;
