import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_store/index';

import {socketReceiver, socketMiddleware} from "../_store/Socket";

const composeEnhancers = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging')
    ? (typeof window === 'object' &&  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ })
        : compose)
    : (typeof window === 'object' && compose);

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware ,socketMiddleware)
    ),
);

socketReceiver(store.dispatch);

export {
    store
}
