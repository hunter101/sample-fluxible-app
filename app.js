import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import EditListingStore from './stores/EditListingStore';
import UserProfileStore from './stores/UserProfileStore';
import RouteStore from './stores/RouteStore';
var fetchrPlugin = require('fluxible-plugin-fetchr');
import batchedUpdatePlugin from 'fluxible-addons-react/batchedUpdatePlugin';

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

app.plug(batchedUpdatePlugin);

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(EditListingStore);
app.registerStore(UserProfileStore);

app.plug(fetchrPlugin({
    xhrPath: '/api',
}));

module.exports = app;
