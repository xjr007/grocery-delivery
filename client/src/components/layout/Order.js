import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteOrder, setOrder } from '../../actions/orders';

const Order = ({ deleteOrder, setOrder, orders }) => {
	const onDelete = order => {
		deleteOrder(order._id);
		// setOrder(order);
	};
	return (
		<div>
			{orders &&
				orders.map(order => (
					<div className='card bg-light'>
						<ul className='order'>
							<li key={order._id}>
								<div className='ref-number'>Reference Number: #{order.referenceNumber}</div>
								<div className='delivery-type'>Delivery Type: {order.deliveryType}</div>
								<div className='item-list'>
									<select>
										<option>View list</option>
										{order.cartOrder.map(item => (
											<option key={item._id} value={item.item}>
												{item.item}
											</option>
										))}
									</select>
								</div>
							</li>
						</ul>
						<p>
							<button className='button' onClick={() => setOrder(order)}>
								Edit
							</button>
							<button className='button' onClick={() => onDelete(order)}>
								Delete
							</button>
						</p>
					</div>
				))}
		</div>
	);
};

Order.propTypes = {
	orders: PropTypes.array,
	deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	orders: state.orders.orders,
});
export default connect(mapStateToProps, {
	deleteOrder,
	setOrder,
})(Order);
