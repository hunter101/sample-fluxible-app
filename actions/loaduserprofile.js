import {navigateAction} from 'fluxible-router';

export default function loadUserProfile(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    actionContext.service.read('user', payload, {}, (err, profile) => {
        if (err || !profile) {
            actionContext.dispatch('USER_ERROR', err);
            actionContext.executeAction(navigateAction, {url: "/"}, done());
        } else {
            actionContext.dispatch('LOAD_USER_PROFILE', profile);
        }
        actionContext.dispatch('LOADING_STATE', false);
        done();
    });
}
