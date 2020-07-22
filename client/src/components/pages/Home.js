import React, { useEffect } from 'react';
import { loadUser, logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Filter from '../layout/Filter';
import Products from '../layout/Products';
import Cart from '../layout/Cart';
import Profile from './Profile';

const Home = ({ loadUser, logout }) => {
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);
	return (
		<div className='grid-2'>
			<button type='button' onClick={logout}>
				Logout
			</button>
			<Filter />
			<Cart />
			<Products />
			<Profile />
		</div>
	);
};

Home.propTypes = {
	loadUser: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
};

export default connect(null, { loadUser, logout })(Home);
