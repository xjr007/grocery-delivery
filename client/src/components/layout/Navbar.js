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

const NavbarComp = ({ auth: { isAuthenticated, loading }, logout }) => {
	return (
		<Nav className=' sticky-top nav-custom m-1'>
			<Nav className='top-nav'>
				<LinkContainer to={ROUTES.HOME}>
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
				{isAuthenticated && !loading ? (
					<NavDropdown title='Account' id='nav-dropdown' className='ml-auto mt-2'>
						<LinkContainer to={ROUTES.PROFILE}>
							<NavDropdown.Item className='link'>Account info</NavDropdown.Item>
						</LinkContainer>

						<NavDropdown.Item onClick={logout} className='link'>
							Log out
						</NavDropdown.Item>
					</NavDropdown>
				) : (
					<Nav className='ml-auto m-3'>
						{' '}
						<LinkContainer to={ROUTES.LOGIN}>
							<Nav.Link className='link '>Login </Nav.Link>
						</LinkContainer>
					</Nav>
				)}
			</Nav>
			<Navbar collapseOnSelect className='ml-auto navbar-custom navbar-dark ' expand='lg'>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav '>
					<Nav>
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
