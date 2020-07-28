import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteOrder } from '../../actions/orders';
import AlertContext from '../../context/alert/AlertContext';
import { clearErrors, loadUser } from '../../actions/auth';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

const Order = ({ deleteOrder, orders, auth: { error, isAuthenticated, loading }, clearErrors }) => {
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;

	const date = new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	});

	useEffect(() => {
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}
	});
	const onDelete = order => {
		deleteOrder(order._id);
	};

	return (
		<div>
			{orders !== null && isAuthenticated && !loading ? (
				orders.map(order => (
					<Card className='order' key={order._id}>
						<Card.Header>Reference Number: #{order.referenceNumber}</Card.Header>
						<Card.Body>
							<Card.Title>Order created: {date.format(Date.parse(order.createdAt))}</Card.Title>
							<Card.Title>Order type: {order.deliveryType}</Card.Title>
							{/* 
							<DropdownButton id='dropdown-basic-button' title='Item List'>
								{order.cartOrder.map(item => (
									<Dropdown.Item key={item._id}>
										<div>{item.title}</div>
									</Dropdown.Item>
								))}
							</DropdownButton> */}

							<Button className='button' onClick={() => onDelete(order)}>
								Delete
							</Button>
						</Card.Body>
					</Card>
				))
			) : (
				<h6 className='no-order'>
					<span>You don't have any orders!</span> <span>Purchase an item to place an order...</span>
				</h6>
			)}
		</div>
	);
};

Order.propTypes = {
	auth: PropTypes.object.isRequired,
	orders: PropTypes.array,
	deleteOrder: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	orders: state.orders.orders,
	auth: state.auth,
});
export default connect(mapStateToProps, {
	deleteOrder,
	clearErrors,
	loadUser,
})(Order);
