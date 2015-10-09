/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
const htmlComponent = React.createFactory(HtmlComponent);
const env = process.env.NODE_ENV;

const debug = debugLib('fluxible-example');

const server = express();
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use(compression());
server.use(bodyParser.json());

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');
// Register our messages REST service
fetchrPlugin.registerService(require('./services/test'));
// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.get('/api/test', function(req, res) {
    res.json({result: "Working Perfectly"});
});

server.use((req, res, next) => {
    let context = app.createContext({
        req: req,
        xhrContext: { // Used as query params for all XHR calls
            lang: 'en-US', // make sure XHR calls receive the same lang as the initial request
            _csrf: 'a3fc2d' // CSRF token to validate on the server using your favorite library
        }
    });

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const html = React.renderToStaticMarkup(htmlComponent({
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(createElementWithContext(context))
        }));

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
