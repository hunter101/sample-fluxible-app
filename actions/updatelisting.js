import {navigateAction} from 'fluxible-router';

export default function updateListingAction(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    actionContext.service.update('listing', payload, {}, (err, userId, messages) => {
        actionContext.dispatch('LOADING_STATE', false);
        if (!err) {
            actionContext.executeAction(navigateAction, {url: "/profile/" + userId}, done());
        } else {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        }
    });
}
