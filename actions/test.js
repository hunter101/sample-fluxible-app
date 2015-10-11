export default function myAction(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    actionContext.service.read('message', payload, {}, (err, messages) => {
        if (err || !messages) {
            actionContext.dispatch('USER_ERROR', err);
        } else {
            if (payload.id) {
                messages = messages.filter(function (message) {
                    return payload.id == message.id ? true : false;
                })
            }
            actionContext.dispatch('MY_ACTION', messages);
            actionContext.dispatch('LOADING_STATE', false);
        }
        done();
    });
}
