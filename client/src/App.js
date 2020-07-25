import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import AlertState from './context/alert/AlertState';
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken } from './util';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Delivery from './components/pages/createDelivery';

import { ROUTES } from './types';
import Profile from './components/pages/Profile';
import NavbarComp from './components/layout/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	return (
		<Provider store={store}>
			<AlertState>
				<Router>
					<Fragment>
						<div className='container'>
							<NavbarComp />
							<Alerts />
							<Switch>
								<PrivateRoute exact path={ROUTES.HOME} component={Home} />
								<Route exact path={ROUTES.LOGIN} component={Login} />
								<Route exact path={ROUTES.REGISTER} component={Register} />
								<PrivateRoute exact path={ROUTES.DELIVERY} component={Delivery} />
								<PrivateRoute exact path={ROUTES.PROFILE} component={Profile} />
								<Route exact path={ROUTES.ABOUT} component={About} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</AlertState>
		</Provider>
	);
};

export default App;
