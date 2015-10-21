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

    // @TODO: Add the id of the listing for verification
    // @TODO: Add error checking etc.
    req.field('listingId', payload.listing.id);
    req.field('type', payload.type);
    req.end((err, res) => {
        actionContext.dispatch('LOADING_STATE', false);
        if (err) {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        } else {
            payload.listing.Files = res.body;
            actionContext.dispatch('LOAD_LISTING', payload.listing);
        }
    });
}
