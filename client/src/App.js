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
import CreateDelivery from './components/pages/createDelivery';
import DeliveryInfo from './components/pages/DeliveryInfo';
import Contact from './components/pages/Contact';
import Profile from './components/pages/Profile';

import { ROUTES } from './types';

import NavbarComp from './components/layout/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import Shop from './components/pages/Shop';

const App = () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	return (
		<Provider store={store}>
			<AlertState>
				<Router>
					<Fragment>
						<NavbarComp />
						<div className='container app'>
							<Alerts />
							<Switch>
								<PrivateRoute exact path={ROUTES.DELIVERY} component={CreateDelivery} />
								<PrivateRoute exact path={ROUTES.PROFILE} component={Profile} />
								<PrivateRoute exact path={ROUTES.SHOP} component={Shop} />
								<Route exact path={ROUTES.HOME} component={Home} />
								<Route exact path={ROUTES.LOGIN} component={Login} />
								<Route exact path={ROUTES.REGISTER} component={Register} />
								<Route exact path={ROUTES.CONTACT} component={Contact} />
								<Route exact path={ROUTES.DELIVERYINFO} component={DeliveryInfo} />
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
