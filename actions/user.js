import {navigateAction} from 'fluxible-router';
import _ from 'underscore';
import userRoles from '../config/roles';

module.exports = function myAction(actionContext, payload, done) {
    actionContext.dispatch('USER_STATE', payload);

    // Auth
    var user = payload.user || {role: 0};
    var url = payload.url;
    var routes = actionContext.getStore('ApplicationStore').getPages();
    var route = _.find(routes, {path: url});

    if (route.auth) {
        if (!user || !userRoles.canAccess(user.role, route.auth)) {
            var message = !user
                ? "You must be logged in to access this content"
                : "You don't have the correct permissions to access this content";
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: message});

            // Is there a redirect route for failed access in the route?
            var redirectUrl = route.redirectOnFail || "/login";
            actionContext.executeAction(navigateAction, {url: redirectUrl + "?redirect=" + url}, done());
        }
    }
    done();
};
