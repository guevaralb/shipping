import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// Initial action to load item list from API
import { getItems } from './actions/itemActions';
// Store config
import configureStore from './store/configureStore';
// Service Worker
import registerServiceWorker from './registerServiceWorker';
// App component
import App from './App';
import './styles/App.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();
// Load item list from API as soon as application initiates
store.dispatch(getItems());

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
