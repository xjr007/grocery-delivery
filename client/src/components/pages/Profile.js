import React, { useEffect } from 'react';
import { fetchOrders } from '../../actions/orders';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../layout/Order';
import { loadUser } from '../../actions/auth';

const Profile = ({ auth: { isAuthenticated, loading }, orders = { orders }, fetchOrders }) => {
	useEffect(() => {
		// loadUser();
		fetchOrders();

		//eslint-disable-next-line
	}, [fetchOrders]);
	return (
		<div>
			<h1>Profile</h1>
			{!orders ||
				(!loading && isAuthenticated && (
					<div>
						{orders.map(order => (
							<ul className='order'>
								<li key={order._id}>
									<Order order={order} />
								</li>
							</ul>
						))}
						)
					</div>
				))}
		</div>
	);
};

Profile.propTypes = {
	orders: PropTypes.array,
	fetchOrders: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	// loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	orders: state.orders.orders,
	fetchOrders: state.fetchOrders,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	fetchOrders,
	// loadUser,
})(Profile);
