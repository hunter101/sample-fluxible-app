import {navigateAction} from 'fluxible-router';
import _ from 'underscore';
import userRoles from '../configs/roles';

module.exports = function myAction(actionContext, payload, done) {
    actionContext.dispatch('USER_STATE', payload);

    // Auth
    var user = payload.user;
    var url = payload.url;
    var routes = actionContext.getStore('ApplicationStore').getPages();
    var route = _.find(routes, {path: url});

    if (route.auth) {
        if (!user || !userRoles.canAccess(user.role, route.auth)) {
            actionContext.executeAction(navigateAction, {url: "/login?redirect=" + url}, done());
        }
    }
    done();
};
