import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../types';
import { formatCurrency } from '../../util';
import Fade from 'react-reveal/Fade';
import { removeFromCart } from '../../actions/cart';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { createOrder, clearOrder } from '../actions/orderActions';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { setOrder } from '../../actions/orders';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AlertContext from '../../context/alert/AlertContext';
import { clearErrors } from '../../actions/auth';
import Alerts from '../../components/layout/Alerts';

const Cart = ({ cart: { cartItems }, removeFromCart, setOrder }) => {
	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;

	const onClick = e => {
		e.preventDefault();
		setOrder([...cartItems]);
	};
	const cartTotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0);
	const total = formatCurrency(cartTotal);

	const openModal = () => {
		// setOrder({ total: [...total], cartOrder: [...cartItems] });
	};

	const closeModal = () => {
		setOrder(null);
	};

	const confirmOrder = order => {
		// createOrder(order);
		setOrder(null);
	};

	return (
		<div className='m-1'>
			{cartItems.length === 0 ? (
				<div className='cart cart-header'> You have {cartItems.length} items in your cart</div>
			) : (
				<DropdownButton className='float-right' id='dropdown-basic-button' title='Cart'>
					{cartItems.map(item => (
						<Dropdown.Item key={item._id}>
							<div>{item.title}</div>
							<div className='right'>
								{formatCurrency(item.price)} x {item.count}
								<Button className='button' type='button' onClick={() => removeFromCart(item)}>
									Remove
								</Button>
							</div>
						</Dropdown.Item>
					))}
					<Dropdown.Divider />
					<Button type='button' className='button' onClick={onClick}>
						Proceed
					</Button>
				</DropdownButton>
			)}
		</div>
	);
};

Cart.propTypes = {
	cart: PropTypes.object.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	setOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	cart: state.cart,
});

export default connect(mapStateToProps, {
	removeFromCart,
	setOrder,
})(Cart);
