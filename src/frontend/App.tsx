import { Container } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import Files from './components/Files';
import store from './redux/store';

const Main = () => (
  <Container>
    <Files />
  </Container>
);

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
