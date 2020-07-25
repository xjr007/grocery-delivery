import React, { Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTES } from '../../types';
import { logout } from '../../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const NavbarComp = ({ auth: { isAuthenticated }, logout }) => {
	return (
		<Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
			<LinkContainer to={ROUTES.HOME}>
				<Nav.Link>
					<Navbar.Brand>Buy&Dash</Navbar.Brand>
				</Nav.Link>
			</LinkContainer>

			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav className='ml-auto'>
					<LinkContainer to={ROUTES.HOME}>
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>

					{isAuthenticated && (
						<NavDropdown title='Account' id='collasible-nav-dropdown'>
							<LinkContainer to={ROUTES.PROFILE}>
								<DropdownItem>Profile</DropdownItem>
							</LinkContainer>
							<NavDropdown.Divider />

							<LinkContainer to='' onClick={logout}>
								<DropdownItem>Log out</DropdownItem>
							</LinkContainer>
						</NavDropdown>
					)}
					{!isAuthenticated && (
						<Nav>
							<LinkContainer to={ROUTES.LOGIN}>
								<Nav.Link>Login</Nav.Link>
							</LinkContainer>
							<LinkContainer to={ROUTES.REGISTER}>
								<Nav.Link>Register</Nav.Link>
							</LinkContainer>
						</Nav>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
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
