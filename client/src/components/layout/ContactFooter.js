import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ROUTES } from '../../types';
import { Link } from 'react-router-dom';
const ContactFooter = () => {
	return (
		<footer className='footer-navigation p-3 mt-3 p-5'>
			<div className='footer-head'>
				<span>Site Links</span>
			</div>
			<Row>
				<Col></Col>
				<Col className='footer-links-1 d-flex flex-column'>
					<Link to={ROUTES.LOGIN} className='link foot-cntrl'>
						Login
					</Link>
					<Link to={ROUTES.REGISTER} className='link foot-cntrl'>
						Register
					</Link>
				</Col>
				<Col className='footer-links-1 d-flex flex-column'>
					<Link to={ROUTES.HOME} className='link foot-cntrl'>
						Home
					</Link>
					<Link to={ROUTES.ABOUT} className='link foot-cntrl'>
						About us
					</Link>
					<Link to={ROUTES.HOME} className='link foot-cntrl'>
						Search
					</Link>
				</Col>
				<Col className='footer-links-2 d-flex flex-column'>
					<Link to={ROUTES.CONTACT} className='link  foot-cntrl'>
						Contact
					</Link>
					<Link to={ROUTES.SHOP} className='link  foot-cntrl'>
						Shop
					</Link>
					<Link to={ROUTES.DELIVERYINFO} className='link  foot-cntrl'>
						Delivery Info
					</Link>
				</Col>
			</Row>
		</footer>
	);
};

export default ContactFooter;
