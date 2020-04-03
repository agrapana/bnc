import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'

import Reducer from './admin/store';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk, logger)(createStore);
const store = createStore(
    Reducer,
    applyMiddleware(promiseMiddleware, ReduxThunk, logger)
);
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
