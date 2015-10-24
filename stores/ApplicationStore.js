import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../config/routes';
import RouteStore from './RouteStore';
import {navigateAction} from 'fluxible-router';
import _ from 'underscore';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentPageName = null;
        this.currentPage = null;
        this.pages = routesConfig;
        this.pageTitle = '';
        this.messages = [];
        this.loading = false;
        this.message = {
            show: false,
            text: ""
        };
        this.user = {role: 0};
        this.query = [];
    }
    handlePageTitle(currentRoute) {
        this.dispatcher.waitFor(RouteStore, () => {
            if (currentRoute && currentRoute.get('title')) {
                this.pageTitle = currentRoute.get('title');
                this.emitChange();
            }
        });
    }
    getCurrentPageName() {
        return this.currentPageName;
    }
    getPageTitle() {
        return this.pageTitle;
    }
    getPages() {
        return this.pages;
    }
    dehydrate() {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            pageTitle: this.pageTitle,
            messages: this.messages,
            user: this.user,
            query: this.query,
            message: this.message
        };
    }

    rehydrate(state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.pageTitle = state.pageTitle,
        this.messages = state.messages,
        this.user = state.user;
        this.query = state.query;
        this.message = state.message;
    }
    handleMyAction(messages) {
        this.messages = messages;
        this.emitChange();
    }
    handleLoadingState(loading) {
        this.loading = loading;

        // Small delay in showing the loading state
        // so the user doesn't get flashed with loading
        // events for tiny requests.
        if (loading) {
            setTimeout(() => {
                this.emitChange();
            }, 500);
        } else {
            // No delay when removing the state
            this.emitChange();
        }
    }
    handleMessageState(message) {
        var defaults = {
            text: "",
            show: true,
            type: "STANDARD"
        };

        var message = _.extend(defaults, message);

        this.message = message;
        this.emitChange();
    }
    handleUserState(payload) {
        var user = payload.user;
        var url  = payload.url;
        this.query = payload.query;
        if (user) {
            this.user = user;
        }
        this.emitChange();
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'NAVIGATE_SUCCESS': 'handlePageTitle',
    'MY_ACTION': 'handleMyAction',
    'LOADING_STATE': 'handleLoadingState',
    'MESSAGE_STATE': 'handleMessageState',
    'USER_STATE': 'handleUserState'
};

export default ApplicationStore;
