import {navigateAction} from 'fluxible-router';
import routes from '../configs/routes';
import _ from 'underscore';
import userRoles from '../configs/roles';

export default function myAction(actionContext, payload, done) {
    actionContext.dispatch('USER_STATE', payload);

    // Auth
    var user = payload.user;
    var url = payload.url;
    var route = _.find(routes, {path: url});

    if (route.auth) {
        if (!user || !userRoles.canAccess(user.role, route.auth)) {
            actionContext.executeAction(navigateAction, {url: "/login?redirect=" + url}, done());
        }
    }
    done();
}
