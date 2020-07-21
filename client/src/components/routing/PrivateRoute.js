import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LOGIN } from '../../types';

const PrivateRoute = ({ auth: { isAuthenticated, loading }, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !loading ? <Redirect to={LOGIN} /> : <Component {...props} />
			}
		/>
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: {
		isAuthenticated: state.isAuthenticated,
		error: state.error,
	},
});

export default connect(mapStateToProps)(PrivateRoute);
