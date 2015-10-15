import {createNavLinkComponent} from 'fluxible-router';
import {navigateAction} from 'fluxible-router';
import _ from 'underscore';
import userAction from '../actions/user.js';
import userRoles from '../configs/roles';

function isLeftClickEvent (e) {
    return e.button === 0;
}

function isModifiedEvent (e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

module.exports = createNavLinkComponent({
    dispatchNavAction: function (e) {
        var navType = this.props.replaceState ? 'replacestate' : 'click';

        if (this.props.followLink) {
            return;
        }

        if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
            // this is a click with a modifier or not a left-click
            // let browser handle it natively
            return;
        }

        var href = this._getHrefFromProps(this.props);

        if (href[0] === '#') {
            // this is a hash link url for page's internal links.
            // Do not trigger navigate action. Let browser handle it natively.
            return;
        }

        if (href[0] !== '/') {
            // this is not a relative url. check for external urls.
            var location = window.location;
            var origin = location.origin || (location.protocol + '//' + location.host);

            if (href.indexOf(origin) !== 0) {
                // this is an external url, do not trigger navigate action.
                // let browser handle it natively.
                return;
            }

            href = href.substring(origin.length) || '/';
        }

        var context = this.props.context || this.context;

        var ApplicationStore = context.getStore('ApplicationStore');
        var user = ApplicationStore.user;
        var pages = ApplicationStore.getPages();
        var route = _.find(pages, {path: href});
        if (route.renderFullPage === true) {
            return;
        }

        e.preventDefault();
        if (this.props.stopPropagation) {
            e.stopPropagation();
        }

        if (route.auth) {
            if (!userRoles.canAccess(user.role, route.auth)) {
                this.context.executeAction(navigateAction, {
                    url: "/login?redirect=" + href,
                });
                return false;
            }
        }

        var onBeforeUnloadText = typeof window.onbeforeunload === 'function' ? window.onbeforeunload() : '';
        var confirmResult = onBeforeUnloadText ? window.confirm(onBeforeUnloadText) : true;

        if (confirmResult) {
            // Removes the window.onbeforeunload method so that the next page will not be affected
            window.onbeforeunload = null;

            context.executeAction(navigateAction, {
                type: navType,
                url: href,
                preserveScrollPosition: this.props.preserveScrollPosition,
                params: this.props.navParams
            });
        }
    },
});
