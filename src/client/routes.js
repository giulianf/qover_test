var React = require('react');
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import NoMatch from './components/NoMatch';
import Layout from './components/Layout';
import IndexPage from './components/HomePage';
import Login from './components/Login';
import LayoutStore from './stores/LayoutStore';
import LayoutActions from './actions/LayoutActions';

import Toastr from 'toastr';
import _ from 'lodash';
// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace, callback) => {
    // no need to have a boolean
    const loggedBool= LayoutStore.parseHash(nextState.location.hash);

    if (!LayoutStore.loggedIn) {
        replace({ pathname: '/login' });
    }
    callback();
}

// OnEnter for callback url to parse access_token
const parseAuthLoginHash = (nextState, replace) => {
    const loggedBool= LayoutStore.parseHash(nextState.location.hash);

    if (LayoutStore.loggedIn || loggedBool) {
        if (_.isEqual(nextState.location.pathname, '/login')) {
            replace({ pathname: '/' })
        } else {
            replace({ pathname: nextState.location.pathname })
        }
    }
}

const routes = (
        <Route path='/' component={Layout}>
            <IndexRoute component={IndexPage} onEnter={requireAuth}/>
            <Route path='/login' component={Login} onEnter={parseAuthLoginHash}/>
            <Route path="*" component={NoMatch} />
        </Route>
);


export default routes;
