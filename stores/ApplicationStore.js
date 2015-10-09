import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../configs/routes';
import RouteStore from './RouteStore';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentPageName = null;
        this.currentPage = null;
        this.pages = routesConfig;
        this.pageTitle = '';
        this.messages = [];
        this.loading = false;
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
            messages: this.messages
        };
    }
    rehydrate(state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.pageTitle = state.pageTitle,
        this.messages = state.messages
    }
    handleMyAction(messages) {
        console.log('handling my action in applicationStore');
        this.messages = messages;
        this.emitChange();
    }
    handleLoadingState(loading) {
        this.loading = loading;
        this.emitChange();
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'NAVIGATE_SUCCESS': 'handlePageTitle',
    'MY_ACTION': 'handleMyAction',
    'LOADING_STATE': 'handleLoadingState'
};

export default ApplicationStore;
