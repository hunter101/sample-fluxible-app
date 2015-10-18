import BaseStore from 'fluxible/addons/BaseStore';
import loadListingAction from '../actions/loadlisting';

class EditListingStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.listing = {};
        this.listing.options = {};
        this.listing.options.all  = [];
        this.dispatcher = dispatcher;
    }

    dehydrate() {
        return {
            listing: this.listing
        };
    }

    rehydrate(state) {
        this.listing = state.listing;
    }

    clearListing() {
        // Reset the current listing state to empty
        this.constructor();
    }

    handleLoadListing(listing) {
        this.listing = listing;
        this.emitChange();
    }

    handleChangeRoute(dunno) {
        console.log(dunno);
    }
}

EditListingStore.storeName = 'EditListingStore';
EditListingStore.handlers = {
    'LOAD_LISTING': 'handleLoadListing',
};

export default EditListingStore;
