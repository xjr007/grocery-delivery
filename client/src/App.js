import React, { Fragment } from 'react';
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

import { LOGIN, REGISTER } from './types';
import Products from './components/Products';
import Filter from './components/Filter';

function App() {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	return (
		<Provider store={store}>
			<AlertState>
				<Router>
					<Fragment>
						<div className='container'>
							<Filter />
							<Products />
							<Alerts />
							<Switch>
								<PrivateRoute exact path='/' component={Home} />
								<Route exact path={LOGIN} component={Login} />

								{/* <Route exact path={REGISTER} component={Register} /> */}
							</Switch>
						</div>
					</Fragment>
				</Router>
			</AlertState>
		</Provider>
	);
}

export default App;
