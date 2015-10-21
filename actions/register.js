import {navigateAction} from 'fluxible-router';

export default function registerAction(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    console.log(payload);
    actionContext.service.create('user', payload, {}, (err, user, messages) => {
        if (err) {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        }
        if (!user) {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: "No user found"});
        }
        actionContext.dispatch('LOADING_STATE', false);
        actionContext.executeAction(navigateAction, {url: "/login"}, done());
    });
}
