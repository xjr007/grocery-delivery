import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteOrder, setCurrent } from '../../actions/orders';

const ContactItem = ({ deleteOrder, setCurrent, order }) => {
	const { _id, referenceNumber, deliveryType } = order;

	const onDelete = () => {
		deleteOrder(_id);
		setCurrent();
	};

	return (
		<div className='card bg-light'>
			<ul className='list'>
				{referenceNumber && (
					<li>
						<i className='fas fa-envelope-open'></i>
						{referenceNumber}
					</li>
				)}
				{deliveryType && (
					<li>
						<i className='fas fa-phone'></i> {deliveryType}
					</li>
				)}
			</ul>
			<p>
				<button className='btn btn-dark btn-sm' onClick={() => setCurrent(order)}>
					Edit
				</button>
				<button className='btn btn-danger btn-sm' onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	orders: PropTypes.object.isRequired,
	order: PropTypes.object.isRequired,
	deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	orders: state.orders,
});
export default connect(mapStateToProps, {
	deleteOrder,
	setCurrent,
})(ContactItem);
