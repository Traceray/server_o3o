/**
 * Created by Trac on 2015/12/7.
 */

/**
 * 添加React组件支持
 */

import PrettyError from 'pretty-error';
var React = require("react");
var ReactDOM = require('react-dom/server');
import {Provider} from "react-redux";
import { reduxReactRouter,match } from '../../node_modules/redux-router/server';
import {ReduxRouter} from 'redux-router';
import createHistory from '../../node_modules/history/lib/createMemoryHistory';
import qs from 'query-string';

var configureStore = require('./store/configureStore.js');
var getRoutes = require("./routes.js");
import Html from './helpers/Html';
import getStatusFromRoutes from './helpers/getStatusFromRoutes';

const pretty = new PrettyError();

//react webpack redux 服务器端渲染
exports.reactServer = function (req, res, initialState) {

    if (__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    const store = configureStore(reduxReactRouter, getRoutes, createHistory, initialState, false);

    function hydrateOnClient() {
        res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
    }

    if (__DISABLE_SSR__) {
        hydrateOnClient();
        return;
    }

    store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {

        if (error) {
            console.error('ROUTER ERROR:', pretty.render(error));
            res.status(500);
            hydrateOnClient();
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (!routerState) {
            res.status(501);
            hydrateOnClient();
        } else if (routerState) {

            // Workaround redux-router query string issue:
            // https://github.com/rackt/redux-router/issues/106
            if (routerState.location.search && !routerState.location.query) {
                routerState.location.query = qs.parse(routerState.location.search);
            }

            store.getState().router.then(() => {
                const component = (
                    <Provider store={store} key="provider">
                        <ReduxRouter/>
                    </Provider>
                );

                const status = getStatusFromRoutes(routerState.routes);
                if (status) {
                    res.status(status);
                }
                res.send('<!doctype html>\n' +
                    ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component}
                                                  store={store}/>));
            }).catch((err) => {
                console.error('DATA FETCHING ERROR:', pretty.render(err));
                res.status(500);
                hydrateOnClient();
            });


        }
        else {
            res.status(404).send('Page Not Found')
        }

    }));

}



