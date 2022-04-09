import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppSnackbarProvider from './components/AppSnackbarProvider';
import Loading from './components/Loading';
import NeedAuth from './components/NeedAuth';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Root from './pages/Root';
import SettingPage from './pages/SettingPage';
import store from './redux/store';

/** 见[原文件](pages/GhEditPage.tsx) */
const GhEditPage = lazy(() => import('./pages/GhEditPage'));
/** 见[原文件](pages/GhViewPage.tsx) */
const GhViewPage = lazy(() => import('./pages/GhViewPage'));
/** 见[原文件](pages/ImgListPage.tsx) */
const ImgListPage = lazy(() => import('./pages/ImgListPage'));

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
                  <Suspense fallback={<Loading />}>
                    <ImgListPage />
                  </Suspense>
                </NeedAuth>
              }
            />
            <Route
              path="about"
              element={
                <NeedAuth>
                  <AboutPage />
                </NeedAuth>
              }
            />
            <Route
              path="ghView/*"
              element={
                <NeedAuth>
                  <Suspense fallback={<Loading />}>
                    <GhViewPage />
                  </Suspense>
                </NeedAuth>
              }
            />
            <Route
              path="ghEdit/*"
              element={
                <NeedAuth>
                  <Suspense fallback={<Loading />}>
                    <GhEditPage />
                  </Suspense>
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
