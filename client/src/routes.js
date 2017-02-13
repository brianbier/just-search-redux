import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';


// Import static pages
import HomePage from './components/pages/home-page';
import CityBike from './components/pages/city-bike';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';

// Import dashboard pages
import Dashboard from './components/dashboard/dashboard';

// Import higher order components
import RequireAuth from './components/auth/require_auth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
    <Route path="/city-bike" component={CityBike} />
		<Route path="/register" component={Register} />
		<Route path="/login" component={Login} />
		<Route path="/logout" component={Logout} />
		<Route path="/dashboard" component={RequireAuth(Dashboard)} />
		<Route path="*" component={NotFoundPage} />
	</Route>
)