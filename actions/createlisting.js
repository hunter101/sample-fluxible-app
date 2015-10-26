import {navigateAction} from 'fluxible-router';
import createMessage from './createmessage';

export default function createListingAction(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    actionContext.service.create('listing', payload, {}, (err, listing, messages) => {
        actionContext.dispatch('LOADING_STATE', false);
        if (!err) {
            actionContext.executeAction(createMessage, {type: "NOTIFICATION", 'text': 'Listing created'});
            actionContext.executeAction(navigateAction, {url: "/profile/" + listing.userId }, done());
        } else {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        }
    });
}
