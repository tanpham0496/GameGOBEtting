import React from 'react';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom'
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import {store} from './_helpers/store';
import GameGo from './gameGo'

render (
    <CookiesProvider>
        <Provider store={store}>
            <GameGo />
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);