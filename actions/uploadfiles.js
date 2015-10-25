import {navigateAction} from 'fluxible-router';
import superagent from 'superagent';

export default function uploadFiles(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);

    // Upload the images
    var req = superagent
        .post("/api/images");

    payload.files.forEach((file) => {
        req.attach('image', file, file.name);
    });

    // @TODO: Add the id of the entity for verification
    // @TODO: Add error checking etc.
    req.field('entityType', payload.entity.type);
    req.field('id', payload.entity.id);
    req.field('type', payload.type);
    req.end((err, res) => {
        actionContext.dispatch('LOADING_STATE', false);
        if (err) {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        } else {
            payload.entity.Files = res.body;
            if (payload.entity.type === "listing") {
                actionContext.dispatch('LOAD_LISTING', payload.entity);
            }
            if (payload.entity.type === "user") {
                actionContext.dispatch('USER_STATE', {user: payload.entity});
            }
        }
        done();
    });
}
