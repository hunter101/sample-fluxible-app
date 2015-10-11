export default function loginAction(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    actionContext.service.create('login', payload, {}, (err, user, messages) => {
        console.log("payload", payload);
        console.log("error", err);
        console.log("user", user);
        console.log("message", messages);
        actionContext.dispatch('LOADING_STATE', false);
        done();
    });
}
