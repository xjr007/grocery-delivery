import React, { useEffect } from 'react';
import { loadUser } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../types';

const Home = ({ auth: { isAuthenticated, loading }, loadUser }) => {
	useEffect(() => {
		loadUser();
	}, [loadUser]);
	return (
		<div className='container d-flex justify-content-center align-items-center flex-wrap flex-column mt-5'>
			<h1>Welcome to BUY&DASH</h1>
			{!isAuthenticated && !loading ? (
				<div>
					<p>Create an account to start purchasing!</p>
					<Link to={ROUTES.REGISTER}>Create Account</Link>
				</div>
			) : (
				<span>Select a few goodies and your order will be on its way</span>
			)}
		</div>
	);
};

Home.propTypes = {
	loadUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { loadUser })(Home);
