import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DELIVERY } from '../../types';
import { formatCurrency } from '../../util';
import Fade from 'react-reveal/Fade';
import { removeFromCart } from '../../actions/cart';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { createOrder, clearOrder } from '../actions/orderActions';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { createOrder } from '../../actions/orders';

const Cart = ({ cart: { cartItems }, removeFromCart, createOrder }) => {
	const [order, setOrder] = useState(null);

	useEffect(() => {
		Modal.setAppElement('body');
		//eslint-disable-next-line
	}, []);

	// const createOrder = e => {
	// 	e.preventDefault();
	// 	const order = {
	// 		email: email,
	// 		address: address,
	// 		cartItems: cartItems,
	// 		total: cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0),
	// 	};
	// 	// 	createOrder(order);
	// };

	const openModal = order => {
		setOrder(order);
	};

	const closeModal = () => {
		setOrder(null);
	};

	const confirmOrder = order => {
		createOrder(order);
		setOrder(null);
	};
	return (
		<div>
			{cartItems.length === 0 ? (
				<div className='cart cart-header'>Cart is empty </div>
			) : (
				<div className='cart cart-header'>You have {cartItems.length} in the cart </div>
			)}

			<div className='cart'>
				<Fade left cascade>
					<ul className='cart-items'>
						{cartItems.map(item => (
							<li key={item._id}>
								<div>
									<img src={item.image} alt={item.title} />
								</div>
								<div>
									<div>{item.title}</div>
									<div className='right'>
										{formatCurrency(item.price)} x {item.count}{' '}
										<button className='button' onClick={() => removeFromCart(item)}>
											Remove
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</Fade>
			</div>
			{cartItems.length !== 0 && (
				<div>
					<div className='cart'>
						<div className='total'>
							<div>
								Total: {formatCurrency(cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0))}
							</div>
							<button
								className='button primary'
								onClick={() => {
									openModal({
										total: cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0),
										cartItems: cartItems,
									});
								}}>
								Proceed
							</button>
						</div>
					</div>

					{order && (
						<Modal isOpen={true} onRequestClose={closeModal}>
							<Zoom>
								<button className='close-modal' onClick={closeModal}>
									Back
								</button>
								<Link to={DELIVERY} onClick={confirmOrder}>
									Confirm
								</Link>
								<div className='order-details'>
									<div>Total: {formatCurrency(order.total)}</div>
									<div className='items-in-cart'>
										All items: <br />
										{order.cartItems.map(item => (
											<ul className='item'>
												<li key={item._id}>
													<img src={item.image} alt={item.title} />
													<p>{item.title}</p>
												</li>
											</ul>
										))}
									</div>
								</div>
							</Zoom>
						</Modal>
					)}
				</div>
			)}
		</div>
	);
};

Cart.propTypes = {
	cart: PropTypes.object.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	createOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	cart: state.cart,
});

export default connect(mapStateToProps, {
	removeFromCart,
	createOrder,
})(Cart);
