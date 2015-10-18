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
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


class Application extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.store = context.getStore('ApplicationStore');
    }

    render() {
        var Handler = this.props.currentRoute.get('handler');

        return (
            <div className="page-wrapper">
                {this.store.message.show && (<MessageState message={this.store.message.text} />)}
                <LoadingState loading={this.store.loading}/>
                <Header user={this.store.user} selected={this.props.pageTitle} links={this.props.pages}/>

                <div className="main">
                    <div className="main-inner">
                        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
                            <Handler key={this.props.currentRoute.get("url")} user={this.store.user} query={this.store.query}/>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                <Footer />
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
