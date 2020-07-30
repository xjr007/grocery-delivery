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
			<div className='container d-flex home-image  mt-3 flex-wrapalign-items-center justify-content-center p-1'>
				<span className='home-text'>Corona? We Deliver.</span>
			</div>

			<Filter />

			<Products />
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
