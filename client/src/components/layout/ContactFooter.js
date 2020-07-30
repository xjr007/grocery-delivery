import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ROUTES } from '../../types';
import { Link } from 'react-router-dom';
const ContactFooter = () => {
	return (
		<footer className='container fluid d-flex footer-navigation p-3 mt-3'>
			<Row>
				<Col>
					<span className='footer'>Contact</span>
					<div className='d-flex flex-wrap flex-column'>
						<Link to={ROUTES.HOME} className='link'>
							<span className='footer'>Home</span>
						</Link>
						<Link to={ROUTES.ABOUT} className='link'>
							<span className='footer'>About us</span>
						</Link>
						<Link to={ROUTES.HOME} className='link'>
							<span className='footer'> Search</span>
						</Link>
						<Link to={ROUTES.SHOP} className='link'>
							<span className='footer'> Shop</span>
						</Link>
						<Link to={ROUTES.DELIVERYINFO} className='link'>
							<span className='footer'> Delivery Info</span>
						</Link>
						<Link to={ROUTES.CONTACT} className='link'>
							<span className='footer'>Contact</span>
						</Link>
						<Link to={ROUTES.LOGIN} className='link'>
							<span className='footer'> Login</span>
						</Link>
						<Link to={ROUTES.REGISTER} className='link'>
							<span className='footer'> Register</span>
						</Link>
					</div>
				</Col>
			</Row>
		</footer>
	);
};

export default ContactFooter;
