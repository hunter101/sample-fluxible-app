import {navigateAction} from 'fluxible-router';

export default function myAction(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    setTimeout(function () {

        actionContext.service.read('listing', payload, {}, (err, listing, meta) => {
            if (err || !listing) {
                actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
                actionContext.executeAction(navigateAction, {url: "/"}, done());
            } else {
                actionContext.dispatch('LOAD_LISTING', listing);
            }
            actionContext.dispatch('LOADING_STATE', false);
            done();
        });

    }, 2000);
}
