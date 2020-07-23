import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteOrder, setOrder } from '../../actions/orders';

const Order = ({ deleteOrder, setOrder, order }) => {
	const onDelete = () => {
		deleteOrder(order._id);
		setOrder();
	};

	return (
		<div className='card bg-light'>
			<ul className='order'>
				<li key={order._id}>
					<div className='ref-number'>Reference Number: #{order.referenceNumber}</div>
					<div className='delivery-type'>Delivery Type: {order.deliveryType}</div>
				</li>
			</ul>
			<p>
				<button className='button' onClick={() => setOrder(order)}>
					Edit
				</button>
				<button className='button' onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

Order.propTypes = {
	orders: PropTypes.object.isRequired,
	order: PropTypes.object.isRequired,
	deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	orders: state.orders,
});
export default connect(mapStateToProps, {
	deleteOrder,
	setOrder,
})(Order);
