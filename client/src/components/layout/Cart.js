import React, { useState, useContext, useEffect } from 'react';
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
import { setOrder, createOrder } from '../../actions/orders';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AlertContext from '../../context/alert/AlertContext';
import Form from 'react-bootstrap/Form';
import { clearErrors } from '../../actions/auth';
import Alerts from '../../components/layout/Alerts';

const Cart = ({
	cart: { cartItems },
	removeFromCart,
	setOrder,
	createOrder,
	clearErrors,
	orders: { current },
}) => {
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;

	const [viewOrder, setViewOrder] = useState(null);
	const [deliveryType, setDeliveryType] = useState(null);

	const cartTotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0);

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
		<div className='m-1'>
			{cartItems.length === 0 || !cartTotal ? (
				<div className='cart cart-header'> You have {cartItems.length} items in your cart</div>
			) : (
				<DropdownButton className='float-right' id='dropdown-basic-button' title='Cart'>
					Total: {formatCurrency(cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0))}
					{cartItems.map(item => (
						<Dropdown.Item key={item._id}>
							<div>{item.title}</div>
							<div className='right'>
								{formatCurrency(item.price)} x {item.count}
								<Button className='button' type='dropdown-toggle' onClick={() => removeFromCart(item)}>
									Remove
								</Button>
							</div>
						</Dropdown.Item>
					))}
					<Dropdown.Divider />
					<Dropdown.Item type='button' className='button' onClick={onProceed}>
						Proceed
					</Dropdown.Item>
				</DropdownButton>
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
	clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	cart: state.cart,
	orders: state.orders,
});

export default connect(mapStateToProps, {
	removeFromCart,
	setOrder,
	createOrder,
	clearErrors,
})(Cart);
