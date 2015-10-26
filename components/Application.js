/*globals document*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import userAction from '../actions/user';
import routes from '../config/routes';
import LoadingState from './misc/LoadingState';
import MessageState from './misc/MessageState';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Application extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.store = context.getStore('ApplicationStore');
        this.state = {};
        this.state.currentRoute = props.currentRoute;
    }

    componentWillUpdate(nextProps, nextState) {
        // Only load the new handler when navigation is complete
        // so we don't render components before any ajax
        // requests have finished firing.
        // Using this method instead of componentShouldUpdate
        // so we can still update the loadingState to inform
        // the user that something is still loading.
        if (nextProps.isNavigateComplete) {
            this.state.currentRoute = this.props.currentRoute;
            //historyState.scroll = {x: window.scrollX, y: window.scrollY};

            // We're also disabliing the enableScroll attr of the handleHistory.js
            // component so we only update the scroll histroy when we actually
            // render a new component, not when we're just firing complete
            window.scrollTo(scroll.x || 0, scroll.y || 0);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }

    render() {

        var Handler = this.state.currentRoute.get('handler');
        var context = this.context;

        return (
            <div className="page-wrapper">
                {this.store.message.show && (<MessageState message={this.store.message.text}/>)}
                <LoadingState loading={this.store.loading}/>
                <Header user={this.store.user} selected={this.props.pageTitle} links={this.props.pages}/>

                <div className="main">
                    <div className="main-inner">
                        <Handler context={context} key={this.props.currentRoute.get("url")} user={this.store.user}
                                 query={this.store.query}/>
                    </div>
                </div>
                <Footer />
            </div>
        );
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
    )),
    // default opts override
    {
        checkRouteOnPageLoad: false,
        enableScroll: false,
    }
);
