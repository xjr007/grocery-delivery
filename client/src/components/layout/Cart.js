import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../util';
import { removeFromCart } from '../../actions/cart';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { setOrder, createOrder } from '../../actions/orders';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cartIcon from '../../assets/cart.png';
import { NavDropdown } from 'react-bootstrap';
import { setAlert } from '../../actions/alert';
import { clearErrors } from '../../actions/auth';

const Cart = ({
	cart: { cartItems },
	removeFromCart,
	setOrder,
	createOrder,
	orders: { current, error },
	setAlert,
	clearErrors,
}) => {
	useEffect(() => {
		Modal.setAppElement('body');
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}
		//eslint-disable-nextline
	}, [setAlert, clearErrors, error]);

	const [viewOrder, setViewOrder] = useState(null);
	const [deliveryType, setDeliveryType] = useState(null);

	const cartTotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0);
	const inCart = cartItems.reduce((acc, curr) => acc + curr.count, 0);

	const onChange = e => {
		e.preventDefault();
		try {
			setDeliveryType(e.target.value);

			setAlert('Order created!', 'success');
		} catch (err) {
			setAlert(err, 'danger');
		}
	};

	const onProceed = () => {
		try {
			setOrder({ ...cartItems });
			setViewOrder({ ...cartItems });
		} catch (err) {
			setAlert(err, 'danger');
		}
	};

	const onClick = () => {
		try {
			createOrder({
				deliveryType: deliveryType,
				cartOrder: viewOrder,
			});
			if (viewOrder) {
				setViewOrder(null);
			}
		} catch (err) {
			setAlert(err, 'danger');
		}
	};

	const closeModal = () => {
		setViewOrder(null);
	};

	return (
		<div className='cart ml-auto'>
			{cartItems.length === 0 || !cartTotal ? (
				<div className='cart-header'> {cartItems.length} items in your cart</div>
			) : (
				<NavDropdown
					title={
						<div>
							<img className=' cart-img' src={cartIcon} alt='Cart Icon' />
							<span>{inCart}</span>
						</div>
					}>
					{cartItems.map(item => (
						<Dropdown.Item className='d-flex flex-column' key={item._id}>
							<span className='cart-total'>
								Cart Total:{' '}
								{formatCurrency(cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0))}
							</span>
							<img className='cart-image' src={item.image} alt={item.title} />
							<div className='cart-title'>{item.title}</div>
							<div className='right cart-price'>
								{formatCurrency(item.price)} x {item.count}
							</div>
							<Button className='button' type='dropdown-toggle' onClick={() => removeFromCart(item)}>
								Remove
							</Button>
						</Dropdown.Item>
					))}
					<Dropdown.Divider />
					<Dropdown.Item type='button' className='button' onClick={onProceed}>
						Proceed
					</Dropdown.Item>
				</NavDropdown>
			)}

			{viewOrder && (
				<Modal isOpen={true} onRequestClose={closeModal}>
					<Zoom>
						<Button className='close-modal' type='button' onClick={closeModal}>
							x
						</Button>
						{current && (
							<Form className='prof-form'>
								<fieldset disabled>
									<Form.Group>
										<Form.Label htmlFor='TotalControl'>Total: </Form.Label>
										<Form.Control
											id='disabledName'
											placeholder={formatCurrency(
												cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0)
											)}
										/>
									</Form.Group>
								</fieldset>
								<Form.Group controlId='Form.ControlSort my-2'>
									<Form.Control size='sm' as='select' value={deliveryType} onChange={onChange}>
										<option>Delivery Type: </option>
										<option value='High'>Priority: High</option>
										<option value='Normal'>Priority: Normal</option>
									</Form.Control>
								</Form.Group>

								<Button className='button' type='button' onClick={onClick}>
									Confirm Order
								</Button>
							</Form>
						)}
					</Zoom>
				</Modal>
			)}
		</div>
	);
};

Cart.propTypes = {
	cart: PropTypes.object.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	setOrder: PropTypes.func.isRequired,
	orders: PropTypes.object.isRequired,
	createOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	cart: state.cart,
	orders: state.orders,
});

export default connect(mapStateToProps, {
	removeFromCart,
	setOrder,
	setAlert,
	clearErrors,
	createOrder,
})(Cart);
