import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../config/routes';
import RouteStore from './RouteStore';
import {navigateAction} from 'fluxible-router';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentPageName = null;
        this.currentPage = null;
        this.pages = routesConfig;
        this.pageTitle = '';
        this.messages = [];
        this.loading = false;
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
            query: this.query
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
    }
    handleMyAction(messages) {
        this.messages = messages;
        this.emitChange();
    }
    handleLoadingState(loading) {
        this.loading = loading;
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
    'USER_STATE': 'handleUserState'
};

export default ApplicationStore;
