import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import AlertState from './context/alert/AlertState';
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken } from './util';

import Login from './components/auth/Login';
// import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import Cart from './components/pages/cartPreview';

import { LOGIN, REGISTER, CART, PROFILE } from './types';
import Profile from './components/pages/Profile';

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
							<Alerts />
							<Switch>
								<PrivateRoute exact path='/' component={Home} />
								<Route exact path={LOGIN} component={Login} />
								<PrivateRoute exact path={CART} component={Cart} />
								<PrivateRoute exact path={PROFILE} component={Profile} />

								{/* <Route exact path={REGISTER} component={Register} /> */}
							</Switch>
						</div>
					</Fragment>
				</Router>
			</AlertState>
		</Provider>
	);
};

export default App;
