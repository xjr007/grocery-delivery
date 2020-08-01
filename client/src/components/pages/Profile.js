import React, { useEffect } from 'react';
import { fetchOrders } from '../../actions/orders';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../layout/Order';
import User from '../layout/User';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { setAlert } from '../../actions/alert';
import { clearErrors } from '../../actions/auth';

const Profile = ({
	auth: { isAuthenticated, loading, error },
	fetchOrders,
	setAlert,
	clearErrors,
}) => {
	useEffect(() => {
		window.scrollTo(0, 0);
		if (isAuthenticated) {
			fetchOrders();
		}
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}
		//eslint-disable-next-line
	}, [fetchOrders, isAuthenticated, setAlert, clearErrors]);

	return (
		<div>
			{!loading && isAuthenticated && (
				<div>
					<h2>Profile</h2>
					<Tabs defaultActiveKey='user-info'>
						<Tab className='tab-key' eventKey='user-info' title='Personal Info'>
							<User />
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

export default connect(mapStateToProps, { fetchOrders, setAlert, clearErrors })(Profile);
