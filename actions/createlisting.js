import {navigateAction} from 'fluxible-router';

export default function createListingAction(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    actionContext.service.create('listing', payload, {}, (err, user, messages) => {
        actionContext.dispatch('LOADING_STATE', false);
        if (!err) {
            actionContext.executeAction(navigateAction, {url: "/"}, done());
        } else {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        }
    });
}
