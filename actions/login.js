export default function loginAction(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    actionContext.service.create('login', payload, {}, (err, user, messages) => {
        if (err) {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        }
        actionContext.dispatch('LOADING_STATE', false);
        done();
    });
}
