import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/icons/icons.css';
import App from './App';
import { SnackbarProvider } from 'notistack';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
  <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </SnackbarProvider>,
  document.getElementById('root')
);
