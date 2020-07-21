import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../../types';

const PrivateRoute = ({ component: Component, Auth, ...rest }) => {
	return (
		<Route {...rest} render={props => (!Auth ? <Redirect to={LOGIN} /> : <Component {...props} />)} />
	);
};

export default PrivateRoute;
