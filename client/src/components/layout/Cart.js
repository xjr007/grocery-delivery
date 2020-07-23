import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CHECKOUT } from '../../types';
import { formatCurrency } from '../../util';
import Fade from 'react-reveal/Fade';
import { removeFromCart } from '../../actions/cart';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { createOrder, clearOrder } from '../actions/orderActions';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

const Cart = ({ cart: { cartItems }, removeFromCart }) => {
	const [viewCheckout, setViewCheckout] = useState(false);
	const [handleInput, setHandleInput] = useState(null);
	const [clearOrder, setClearOrder] = useState(false);
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
	// // const { cartItems, order } = this.props;
	return (
		<div>
			{cartItems.length === 0 ? (
				<div className='cart cart-header'>Cart is empty </div>
			) : (
				<div className='cart cart-header'>You have {cartItems.length} in the cart </div>
			)}

			{/* {order && (
				<Modal isOpen={true} onRequestClose={closeModal}>
					<Zoom>
						<button className='close-modal' onClick={closeModal}>
							x
						</button>
						<div className='order-details'>
							<h3 className='success-message'>Your order has been placed</h3>
							<h2>Order {order._id}</h2>
							<ul>
								<li>
									<div>Name:</div>
									<div>{order.name}</div>
								</li>
								<li>
									<div>Email:</div>
									<div>{order.email}</div>
								</li>
								<li>
									<div>Address:</div>
									<div>{order.address}</div>
								</li>
								<li>
									<div>Date:</div>
									<div>{order.createdAt}</div>
								</li>
								<li>
									<div>Total:</div>
									<div>{order.total}</div>
								</li>
								<li>
									<div>Cart Items:</div>
									<div>
										{order.cartItems.map(x => (
											<div>
												{x.count} {' x '} {x.title}
											</div>
										))}
									</div>
								</li>
							</ul>
						</div>
					</Zoom>
				</Modal>
			)} */}

			<div className='cart'>
				<Fade left cascade>
					<ul className='cart-items'>
						{cartItems.map(item => (
							<li key={cartItems._id}>
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
								<Link to={CHECKOUT} onClick={closeModal}>
									Confirm
								</Link>
								<div className='order-details'>
									<div>Total: {formatCurrency(order.total)}</div>
									<div className='items-in-cart'>
										All items: <br />
										{order.cartItems.map(item => (
											<ul className='item'>
												<li>
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

					{/* {showCheckout && (
						<Fade right cascade>
							<div className='cart'>
								<form onSubmit='createOrder'>
									<ul className='form-container'>
										<li>
											<label>Email</label>
											<input
												name='email'
												type='email'
												required
												onChange={e => setHandleInput({ [e.target.name]: e.target.value })}
											/>
										</li>
										<li>
											<label>Name</label>
											<input name='name' type='text' required onChange={handleInput} />
										</li>
										<li>
											<label>Address</label>
											<input name='address' type='text' required onChange={handleInput} />
										</li>
										<li>
											<button className='button primary' type='submit'>
												Checkout
											</button>
										</li>
									</ul>
								</form>
							</div>
						</Fade>
					)} */}
				</div>
			)}
		</div>
	);
};

Cart.propTypes = {
	// order: PropTypes.object,
	cart: PropTypes.object.isRequired,
	removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	// order: state.order.order,
	cart: state.cart,
});

export default connect(mapStateToProps, {
	removeFromCart,
})(Cart);
