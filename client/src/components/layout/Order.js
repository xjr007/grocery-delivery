import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteOrder } from '../../actions/orders';
import { loadUser } from '../../actions/auth';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Order = ({ deleteOrder, orders }) => {
	const date = new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	});

	const onDelete = order => {
		deleteOrder(order._id);
	};

	console.log(orders);

	return (
		<div>
			{orders.length === 0 ? (
				<h6 className='no-order'>
					<span>You don't have any orders!</span> <span>Purchase an item to place an order...</span>
				</h6>
			) : (
				orders.map(order => (
					<Card className='order' key={order._id}>
						<Card.Header>Reference Number: #{order.referenceNumber}</Card.Header>
						<Card.Body>
							<Card.Title>Order Created: {date.format(Date.parse(order.createdAt))}</Card.Title>
							<Card.Title>Delivery Type: {order.deliveryType}</Card.Title>

							<Button className='button' onClick={() => onDelete(order)}>
								Delete
							</Button>
						</Card.Body>
					</Card>
				))
			)}
		</div>
	);
};

Order.propTypes = {
	orders: PropTypes.array.isRequired,
	deleteOrder: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	orders: state.orders.orders,
});
export default connect(mapStateToProps, {
	deleteOrder,
	loadUser,
})(Order);
