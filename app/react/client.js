//import "babel-core/polyfill";
import React from "react";
import Router from "react-router";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';
import createHistory from '../../node_modules/history/lib/createBrowserHistory';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';
import useScroll from '../../node_modules/scroll-behavior/lib/useStandardScroll';

import configureStore from './store/configureStore.js'
import getRoutes from './routes'

// Three different types of scroll behavior available.
// Documented here: https://github.com/rackt/scroll-behavior
const scrollablehistory = useScroll(createHistory);


const initialState = window.__INITIAL_STATE__;
const store = configureStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), scrollablehistory, initialState);

const dest = document.getElementById('content');

const component = (
    <ReduxRouter routes={getRoutes(store)}/>
);

ReactDOM.render(
    <Provider store={store} key="provider">
        {component}
    </Provider>,
    dest
);

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require('./containers/DevTools/DevTools');
    ReactDOM.render(
        <Provider store={store} key="provider">
            <div>
                {component}
                <DevTools />
            </div>
        </Provider>,
        dest
    );
}

