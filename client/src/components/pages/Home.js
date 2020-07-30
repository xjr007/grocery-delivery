import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_transparent.png';
import Products from '../layout/Products';
import Filter from '../layout/Filter';

const Home = ({ auth: { isAuthenticated, loading } }) => {
	return (
		<div className='container d-flex justify-content-center flex-column align-items-center'>
			<div className='container d-flex home-image justify-content-center mt-3 flex-column align-items-center p-1'>
				<span className='home-text'>STAY SAFE.</span>
				<span className='home-text'>WE DELIVER.</span>
			</div>

			<Filter />

			<Products />
			{isAuthenticated && !loading ? <div>Logged in</div> : <div>Logged out</div>}
		</div>
	);
};

Home.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(Home);
