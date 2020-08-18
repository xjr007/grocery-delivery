import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTES } from '../../types';
import { logout } from '../../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Dropdown } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cart from './Cart';

const NavbarComp = ({ auth: { isAuthenticated, loading }, logout }) => {
	return (
		<Navbar
			collapseOnSelect
			className='sticky-top ml-auto nav-custom navbar-custom navbar-dark '
			expand='lg'>
			<LinkContainer to={ROUTES.HOME} className='m-logo'>
				<Nav.Link className='d-flex flex-column'>
					<div>
						<span className='d-logo'>B</span>
						<span className='d-logo'>U</span>
						<span className='d-logo'>Y</span>
						<span className='ampersamp'>&</span>
						<span className='d-logo'>D</span>
						<span className='d-logo'>A</span>
						<span className='d-logo'>S</span>
						<span className='d-logo'>H</span>
					</div>

					<span className='sub-logo'>...FROM THE COMFORT OF YOUR COUCH</span>
				</Nav.Link>
			</LinkContainer>

			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav  '>
				<Nav className='navbar-links d-flex justify-content-center align-items-center ml-auto mr-auto'>
					<LinkContainer to={ROUTES.HOME}>
						<Nav.Link className='link-nav '>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to={ROUTES.ABOUT}>
						<Nav.Link className='link-nav'>About us</Nav.Link>
					</LinkContainer>
					<LinkContainer to={ROUTES.SHOP}>
						<Nav.Link className='link-nav'>Shop</Nav.Link>
					</LinkContainer>
					<LinkContainer to={ROUTES.DELIVERYINFO}>
						<Nav.Link className='link-nav'>Delivery Info</Nav.Link>
					</LinkContainer>
					<LinkContainer to={ROUTES.CONTACT}>
						<Nav.Link className='link-nav'>Contact</Nav.Link>
					</LinkContainer>
					<Dropdown.Divider />
				</Nav>
			</Navbar.Collapse>
			{isAuthenticated && !loading ? (
				<Nav>
					<NavDropdown id='nav-dropdown-basic' title='Account' className='accounts ml-auto'>
						<LinkContainer to={ROUTES.PROFILE}>
							<NavDropdown.Item className='link'>Account info</NavDropdown.Item>
						</LinkContainer>

						<NavDropdown.Item onClick={logout} className='link'>
							Log out
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			) : (
				<Nav className='ml-auto m-3'>
					{' '}
					<LinkContainer to={ROUTES.LOGIN}>
						<Nav.Link className='link-nav '>Login </Nav.Link>
					</LinkContainer>
				</Nav>
			)}
			<Cart />
		</Navbar>
	);
};

NavbarComp.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarComp);
