import React, { useEffect } from 'react';
import { fetchOrders } from '../../actions/orders';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../layout/Order';

const Profile = ({ auth: { isAuthenticated, loading }, fetchOrders }) => {
	useEffect(() => {
		if (isAuthenticated) {
			fetchOrders();
		}

		//eslint-disable-next-line
	}, [fetchOrders, isAuthenticated]);

	return (
		<div>
			<h1>Profile</h1>
			{!loading && isAuthenticated && (
				<div>
					<Order />
				</div>
			)}
		</div>
	);
};

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
	fetchOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { fetchOrders })(Profile);
