import {RouteStore} from 'fluxible-router';
import routes from '../configs/routes';
import _ from 'underscore';

class AuthRoutesStore extends RouteStore {
    constructor(routes) {
        routes = _.filter( (route) => {
            return route.path !== "/about" ? true : false;
        });
        super(routes)
    }

    _handleNavigateStart(payload) {

    }
}
//
//var authRoutes = {};
//_.map(routes, (route, i) => {
//    if (route.path !== "/abouta") {
//        authRoutes[i] = route
//    }
//});

//console.log(authRoutes);

export default AuthRoutesStore.withStaticRoutes(routes);
//export default RouteStore.withStaticRoutes(routes);
