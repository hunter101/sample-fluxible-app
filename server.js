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
import userAction from './actions/user.js';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
import models from "./models";
import _ from "underscore";

const htmlComponent = React.createFactory(HtmlComponent);
const env = process.env.NODE_ENV;
//const env = "DEVELOPMENT";
const debug = debugLib('fluxible-example');
const server = express();
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use(compression());
server.use(bodyParser.json());       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Thumbnail rendering
var qt = require('quickthumb');
server.use('/assets', qt.static(__dirname + '/assets'));

//debugLib.enable('*');

// authentication
import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;
//import { Strategy } from 'passport-local-fluxible';
import cookieParser from 'cookie-parser';
import session from 'express-session';
//var SequelizeStore = require('connect-session-sequelize')(session.Store);
var SequelizeStore = require('express-sequelize-session')(session.Store);


server.use(cookieParser());
server.use(session({
    secret: "This is my secret",
    name: "cookie-namea",
    store: new SequelizeStore(models.sequelize),
    //proxy: true,
    resave: false,
    saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null,  {
        id: user["id"],
        username: user["username"],
        canAccess: user.canAccess
    });
});

passport.deserializeUser(function (user, done) {
    models.User.findById(user.id)
        .then(function (user) {
            var err = user ? null : "No User Found";
            done(err, user);
        });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        models.User.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (user.password !== password) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));

server.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

server.get('/logout', function (req, res) {
   req.logout();
   res.redirect("/");
});

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');
// Register our messages REST service
fetchrPlugin.registerService(require('./services/test'));
fetchrPlugin.registerService(require('./services/users'));
fetchrPlugin.registerService(require('./services/login'));
// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

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
        url: req.url,
        user: req.user
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        // Pass in the user to the components through an action
        // so we can render any initial user related content on the server
        // also acts as auth to prevent server side rendering of pagese
        // that the user has no auth to.
        context.getActionContext().executeAction(userAction,
            {user: req.user, url: req.url},
            (err) => {

                debug('Exposing context sites');
                const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

                debug('Rendering Application component into html');
                const html = React.renderToStaticMarkup(htmlComponent({
                    clientFile: env === 'production' ? 'main.min.js' : 'main.min.js',
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
});

models.sequelize.sync()
    .then(function () {

        const port = process.env.PORT || 3001;
        server.listen(port);
        console.log('Application listening on port ' + port);
    });

export default server;
