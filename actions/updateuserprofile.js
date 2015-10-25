import {navigateAction} from 'fluxible-router';

export default function updateuserprofile(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    console.log(payload);
    actionContext.service.update('user', payload, {}, (err, rowsAffected, messages) => {
        if (err) {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        }
        if (rowsAffected !== 1) {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: "Error while updating profile, No user found"});
        }
        if (rowsAffected) {
            actionContext.dispatch('MESSAGE_STATE', {
                show: true,
                type: "NOTICE",
                text: "User profile successfully updated"
            });
        }
        actionContext.dispatch('LOADING_STATE', false);
        done();
    });
}
