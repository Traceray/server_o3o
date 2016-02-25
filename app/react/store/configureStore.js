/**
 *
 */
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import transitionMiddleware from '../middleWares/transitionMiddleware';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

export default function createStore(reduxReactRouter, getRoutes, createHistory, initialState) {

    let finalCreateStore;
    if (__DEVELOPMENT__ && __CLIENT__) {
        const clientMiddleware = [transitionMiddleware, thunk, createLogger()];
        if (__DEVTOOLS__) {
            const { persistState } = require('redux-devtools');
            const DevTools = require('../containers/DevTools/DevTools');
            finalCreateStore = compose(
                applyMiddleware(...clientMiddleware),
                window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
                persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
            )(_createStore);
        } else {
            finalCreateStore = compose(
                applyMiddleware(...clientMiddleware)
            )(_createStore);
        }
    } else {
        const serverMiddleware = [transitionMiddleware, thunk];
        finalCreateStore = applyMiddleware(...serverMiddleware)(_createStore);
    }

    finalCreateStore = reduxReactRouter({getRoutes, createHistory})(finalCreateStore);

    const store = finalCreateStore(rootReducer, initialState);

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers'));
        });
    }

    return store;
}




