import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
var fetchrPlugin = require('fluxible-plugin-fetchr');

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);

app.plug(fetchrPlugin({
    xhrPath: '/api' // Path for XHR to be served from
}));

module.exports = app;
