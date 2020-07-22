import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../actions/orders';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../layout/Order';

const Profile = ({
	auth: { isAuthenticated, loading },
	orders = { orders, loading },
	fetchOrders,
}) => {
	useEffect(() => {
		fetchOrders();
		//eslint-disable-next-line
	}, [fetchOrders]);

	return (
		<div>
			{orders !== null ||
				(!loading && isAuthenticated && (
					<div>
						{orders.orders.map(order => (
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
	orders: PropTypes.object,
	fetchOrders: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	orders: state.orders,
	fetchOrders: state.fetchOrders,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	fetchOrders,
})(Profile);
