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
import DropdownButton from 'react-bootstrap/DropdownButton';
import Logo from '../../assets/linkedin_banner_image_1.png';

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
							<NavDropdown.Item eventKey='4.1'>Account info</NavDropdown.Item>
						</LinkContainer>

						<NavDropdown.Item eventKey='4.1' onClick={logout}>
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
			<Navbar collapseOnSelect className='ml-auto navbar-custom ' expand='lg'>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' className='navbar-custom' />
				<Navbar.Collapse id='responsive-navbar-nav '>
					<Nav>
						<LinkContainer to={ROUTES.HOME}>
							<Nav.Link className='link '>Home</Nav.Link>
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
						<Dropdown.Divider />

						{/* {isAuthenticated && !loading ? (
								<DropdownButton as={Nav.Item} variant={'button'} title='Profile'>
									<LinkContainer to={ROUTES.PROFILE}>
										<Dropdown.Item>Account</Dropdown.Item>
									</LinkContainer>
									<Dropdown.Divider />
									<Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
								</DropdownButton>
							) : (
								<div className=''>
									{' '}
									<LinkContainer to={ROUTES.LOGIN}>
										<Nav.Link className='link'>Login </Nav.Link>
									</LinkContainer>
									<LinkContainer to={ROUTES.REGISTER}>
										<Nav.Link className='link'>Register </Nav.Link>
									</LinkContainer>
								</div>
							)} */}
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
