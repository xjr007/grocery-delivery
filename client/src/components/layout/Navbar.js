import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTES } from '../../types';
import { logout } from '../../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Dropdown } from 'react-bootstrap';

const NavbarComp = ({ auth: { isAuthenticated }, logout }) => {
	return (
		<div>
			<Nav>
				<LinkContainer to={ROUTES.HOME}>
					<Nav.Link>Buy&Dash</Nav.Link>
				</LinkContainer>
				<Dropdown as={Nav.Item} className='ml-auto'>
					<Dropdown.Toggle as={Nav.Link}>Profile</Dropdown.Toggle>
					<Dropdown.Menu>
						<LinkContainer to={ROUTES.PROFILE}>
							<Dropdown.Item>Account</Dropdown.Item>
						</LinkContainer>

						<Dropdown.Divider />
						<Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Nav>

			<Nav className='justify-content-center'>
				<LinkContainer to={ROUTES.HOME}>
					<Nav.Link>Home</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/'>
					<Nav.Link>About us</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/'>
					<Nav.Link>Search</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/'>
					<Nav.Link>Shop</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/'>
					<Nav.Link>Delivery</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/'>
					<Nav.Link>Contact</Nav.Link>
				</LinkContainer>
			</Nav>
		</div>

		// <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
		// 	<LinkContainer to={ROUTES.HOME}>
		// 		<Nav.Link>
		// 			<Navbar.Brand>Buy&Dash</Navbar.Brand>
		// 		</Nav.Link>
		// 	</LinkContainer>

		// 	<Navbar.Toggle aria-controls='responsive-navbar-nav' />
		// 	<Navbar.Collapse id='responsive-navbar-nav'>
		// 		<Nav fill variant='tabs' defaultActiveKey={ROUTES.HOME} className='justify-content-center'>
		// 			<LinkContainer to={ROUTES.HOME}>
		// 				<Nav.Item>Home</Nav.Item>
		// 			</LinkContainer>
		// 		</Nav>

		// 	</Navbar.Collapse>
		// </Navbar>

		// <navbar className='navbar  '>
		// 	<Link to={ROUTES.HOME}>
		// 		{' '}
		// 		<span className='logo'>Logo</span>
		// 	</Link>
		// 	<nav className=' navbar-collapse navbar-nav'>
		// 		<Link to={ROUTES.LOGIN}>
		// 			<span className='nav-login'>Login</span>
		// 		</Link>
		// 		<Link to={ROUTES.PROFILE}>
		// 			<span className='nav-profile'>Profile</span>
		// 		</Link>
		// 		<Link to={ROUTES.LOGIN} onClick={logout}>
		// 			Logout
		// 		</Link>
		// 	</nav>
		// </navbar>
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
