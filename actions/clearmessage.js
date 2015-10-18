export default function clearMessage(actionContext, payload, done) {
    actionContext.dispatch('MESSAGE_STATE', {});
    done();
}
