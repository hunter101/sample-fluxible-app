import BaseStore from 'fluxible/addons/BaseStore';

class UserProfileStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.profile = {};
        this.profile.Listings = [];
        this.dispatcher = dispatcher;
    }

    dehydrate() {
        return {
            profile: this.profile
        };
    }

    rehydrate(state) {
        this.profile = state.profile;
    }

    handleLoadProfile(profile) {
        this.profile = profile;
        this.emitChange();
    }

    getProfile() {
        return this.profile;
    }
}

UserProfileStore.storeName = 'UserProfileStore';
UserProfileStore.handlers = {
    'LOAD_USER_PROFILE': 'handleLoadProfile'
};

export default UserProfileStore;
