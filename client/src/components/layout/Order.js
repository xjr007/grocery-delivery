import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteOrder, setOrder } from '../../actions/orders';

const Order = ({ deleteOrder, setOrder, order }) => {
	const { _id, referenceNumber, deliveryType } = order;

	const onDelete = () => {
		deleteOrder(_id);
		setOrder();
	};

	return (
		<div className='card bg-light'>
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
