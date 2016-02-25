import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

import config from '../config';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    };

    render() {
        const {assets, component, store} = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';

        return (
            <html>
            <head>
                {DocumentMeta.renderAsReact()}

                <link rel="shortcut icon" href="/ff/favicon.png"/>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="description" content="o3oThumb"/>
                <meta name="keywords" content="o3oThumb"/>
                <meta httpEquiv="content-type" content="text/html;charset=UTF-8"/>
                <meta name="renderer" content="webkit"/>
                <meta httpEquiv="Cache-Control" content="no-siteapp"/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>

                {/* styles (will be present only in production with webpack extract text plugin) */}
                {Object.keys(assets.styles).map((style, key) =>
                    <link href={assets.styles[style]} key={key} media="screen, projection"
                          rel="stylesheet" type="text/css" charSet="UTF-8"/>
                )}
                {/* (加载第三方css插件) */}

                <link rel="stylesheet" href={config.staticPrefixPath+"/bower_components/pure/grids-min.css"}/>
                <link rel="stylesheet"
                      href={config.staticPrefixPath+"/bower_components/weui/dist/style/weui.min.css"}/>
                <link rel=" stylesheet"
                      href={config.staticPrefixPath+"/iconfont/iconfont.css"}/>
                <link rel="stylesheet" href={config.staticPrefixPath+"/css/animation.css"}/>
                <link rel="stylesheet" href={config.staticPrefixPath+"/app.css"}/>


                {/* (will be present only in development mode) */}
                {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
                {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
                {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
                { Object.keys(assets.styles).length === 0 ? <style
                    dangerouslySetInnerHTML={{__html: require('../containers/app/App.scss')._style}}/> : null }

            </head>
            <body>

            {/*全局引入第三方插件*/}
            <script src={config.staticPrefixPath+"/bower_components/jquery/dist/jquery.min.js"}/>
            <script src={config.staticPrefixPath+"/bower_components/scrollTo/jquery.scrollTo.min.js"}/>
            <script src={config.staticPrefixPath+"/bower_components/swipeSlide/swipeSlide.min.js"}/>

            <script src={config.staticPrefixPath+"/app.js"}/>
            <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"/>


            <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
            <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${serialize(store.getState())};`}}
                    charSet="UTF-8"/>
            <script src={assets.javascript.main} charSet="UTF-8"/>

            </body>
            </html>
        );
    }
}
