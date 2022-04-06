import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppSnackbarProvider from './components/AppSnackbarProvider';
import NeedAuth from './components/NeedAuth';
import GhEditPage from './pages/GhEditPage';
import GhViewPage from './pages/GhViewPage';
import HomePage from './pages/HomePage';
import ImgListPage from './pages/ImgListPage';
import LoginPage from './pages/LoginPage';
import Root from './pages/Root';
import SettingPage from './pages/SettingPage';
import store from './redux/store';

const App = () => (
  <AppSnackbarProvider>
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
              path="imgList"
              element={
                <NeedAuth>
                  <ImgListPage />
                </NeedAuth>
              }
            />
            <Route
              path="ghView/*"
              element={
                <NeedAuth>
                  <GhViewPage />
                </NeedAuth>
              }
            />
            <Route
              path="ghEdit/*"
              element={
                <NeedAuth>
                  <GhEditPage />
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
  </AppSnackbarProvider>
);

export default App;
