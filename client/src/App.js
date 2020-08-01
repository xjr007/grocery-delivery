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
import DeliveryInfo from './components/pages/DeliveryInfo';
import Contact from './components/pages/Contact';
import Profile from './components/pages/Profile';
import ContactFooter from './components/layout/ContactFooter';
import Cart from './components/layout/Cart';

import { ROUTES } from './types';

import NavbarComp from './components/layout/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import Shop from './components/pages/Shop';
import Searchbar from './components/layout/Searchbar';

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
						<div className='container'></div>
						<div className='container app'>
							<Alerts />

							<Switch>
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
						<ContactFooter />
					</Fragment>
				</Router>
			</AlertState>
		</Provider>
	);
};

export default App;
