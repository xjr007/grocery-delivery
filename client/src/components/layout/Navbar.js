import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTES } from '../../types';
import { logout } from '../../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';

const NavbarComp = ({ auth: { isAuthenticated, loading }, logout }) => {
	return (
		<Nav className='d-flex flex-column sticky-top nav-custom'>
			<Nav>
				<LinkContainer to={ROUTES.HOME}>
					<Nav.Link>
						<span className='d-logo'>B</span>
						<span className='d-logo'>U</span>
						<span className='d-logo'>Y</span>
						<span className='ampersamp'>&</span>
						<span className='d-logo'>D</span>
						<span className='d-logo'>A</span>
						<span className='d-logo'>S</span>
						<span className='d-logo'>H</span>
					</Nav.Link>
				</LinkContainer>
				{isAuthenticated && !loading ? (
					<DropdownButton as={Nav.Item} variant={'button'} className='ml-auto' title='Profile'>
						<LinkContainer to={ROUTES.PROFILE}>
							<Dropdown.Item>Account</Dropdown.Item>
						</LinkContainer>
						<Dropdown.Divider />
						<Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
					</DropdownButton>
				) : (
					<div className='ml-auto d-flex flex-row'>
						{' '}
						<LinkContainer to={ROUTES.LOGIN}>
							<Nav.Link>Login </Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.REGISTER}>
							<Nav.Link>Register </Nav.Link>
						</LinkContainer>
					</div>
				)}
			</Nav>

			<Navbar collapseOnSelect className=' ml-auto ' expand='lg'>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav '>
					<Nav>
						<LinkContainer to={ROUTES.HOME}>
							<Nav.Link className='link'>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.ABOUT}>
							<Nav.Link className='link'>About us</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/'>
							<Nav.Link className='link'>Search</Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.SHOP}>
							<Nav.Link className='link'>Shop</Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.DELIVERYINFO}>
							<Nav.Link className='link'>Delivery Info</Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.CONTACT}>
							<Nav.Link className='link'>Contact</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
    </Nav>
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
