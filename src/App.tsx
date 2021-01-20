import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';

import redux from './redux';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={redux}>
      <Routes />
    </Provider>
  );
}

export default App;
