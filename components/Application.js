/*globals document*/

import React from 'react';
import Nav from './Nav';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import userAction from '../actions/user.js';
import routes from '../configs/routes';
import LoadingState from './misc/LoadingState.js';

class Application extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.store = context.getStore('ApplicationStore');
    }

    render() {
        var Handler = this.props.currentRoute.get('handler');

        return (
            <div>
                <div>{this.store.user.displayName || "not logged in"}</div>
                {this.store.user.profileUrl && (
                    <img src={this.store.user.profileUrl} />
                )}
                <LoadingState loading={this.store.loading} />
                <Nav selected={this.props.pageTitle} links={this.props.pages} />
                <Handler />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
}

Application.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default handleHistory(provideContext(connectToStores(
    Application,
    [ApplicationStore],
    function (context, props) {
        var appStore = context.getStore(ApplicationStore);
        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            pages: appStore.getPages()
        };
    }
)));
