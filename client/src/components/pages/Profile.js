import React, { useEffect } from 'react';
import { fetchOrders } from '../../actions/orders';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../layout/Order';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ROUTES } from '../../types';

const Profile = ({ auth: { isAuthenticated, loading }, fetchOrders }) => {
	useEffect(() => {
		if (isAuthenticated) {
			fetchOrders();
		}

		//eslint-disable-next-line
	}, [fetchOrders, isAuthenticated]);

	return (
		<div>
			{!loading && isAuthenticated && (
				<div>
					<h2>Profile</h2>
					<Tabs defaultActiveKey='user-info'>
						<Tab className='tab-key' eventKey='user-info' title='Personal Info'>
							<h4>User</h4>
						</Tab>
						<Tab className='tab-key' eventKey='order' title='Order'>
							<Order />
						</Tab>
					</Tabs>
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
