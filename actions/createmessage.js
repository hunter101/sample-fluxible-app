export default function createMessage(actionContext, payload, done) {
    actionContext.dispatch('MESSAGE_STATE', payload);
    done();
}
