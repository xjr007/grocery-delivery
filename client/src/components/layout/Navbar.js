import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTES } from '../../types';
import { logout } from '../../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Dropdown } from 'react-bootstrap';

const NavbarComp = ({ auth: { isAuthenticated, loading }, logout }) => {
	return (
		<div>
			<Nav>
				<LinkContainer to={ROUTES.HOME}>
					<Nav.Link>
						<span>B</span>
						<span>U</span>
						<span>Y</span>
						<span className='ampersamp'>&</span>
						<span>D</span>
						<span>A</span>
						<span>S</span>
						<span>H</span>
					</Nav.Link>
				</LinkContainer>
				<Dropdown as={Nav.Item} className='ml-auto'>
					<Dropdown.Toggle as={Nav.Link}>Profile</Dropdown.Toggle>
					<Dropdown.Menu>
						<LinkContainer to={ROUTES.PROFILE}>
							<Dropdown.Item>Account</Dropdown.Item>
						</LinkContainer>
						<Dropdown.Divider />

						{isAuthenticated && !loading && <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>}
					</Dropdown.Menu>
				</Dropdown>
			</Nav>

			<Navbar collapseOnSelect expand='md' bg='light' variant='light' className=''>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='ml-auto mr-auto'>
						<LinkContainer to={ROUTES.HOME}>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.ABOUT}>
							<Nav.Link>About us</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/'>
							<Nav.Link>Search</Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.SHOP}>
							<Nav.Link>Shop</Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.DELIVERYINFO}>
							<Nav.Link>Delivery Info</Nav.Link>
						</LinkContainer>
						<LinkContainer to={ROUTES.CONTACT}>
							<Nav.Link>Contact</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
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
