var _ = require('underscore');

export default function deleteFile(actionContext, payload, done) {
    actionContext.dispatch('LOADING_STATE', true);
    actionContext.service.delete('file', payload, {}, (err, res, messages) => {
        actionContext.dispatch('LOADING_STATE', false);

        if (err) {
            actionContext.dispatch('MESSAGE_STATE', {show: true, type: "ERROR", text: err.message});
        }

        // Remove the file from the listing object and
        // send back through to rerender, avoids another
        // server call to re-render the listing object
        var listing = payload.listing;
        listing.Files = _.without(listing.Files, payload.file);

        // If we need to remove a file before adding a new one
        // (ie. logos etc. where the account can only have one file)
        // we need to pass in the upload file function as a callback
        // here so it only triggers after the first file is removed.
        if (payload.callback) {
            payload.callback();
        }

        actionContext.dispatch('LOAD_LISTING', listing);
        done();
    })
}
