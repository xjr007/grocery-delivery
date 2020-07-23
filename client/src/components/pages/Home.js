import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadUser, logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Filter from '../layout/Filter';
import Products from '../layout/Products';
import Cart from '../layout/Cart';
import { PROFILE } from '../../types';
// import { setAuthToken } from '../../util';

const Home = ({ loadUser, logout }) => {
	useEffect(() => {
		loadUser();
	}, [loadUser]);
	const [prompt, setPrompt] = useState(null);

	const toProfile = e => {
		e.preventDefault();
	};

	const exitApp = () => {
		logout();
	};

	return (
		<div className='home'>
			<button type='button' onClick={exitApp}>
				Logout
			</button>
			<button onClick={toProfile}>
				<Link to={PROFILE}>Profile</Link>
			</button>

			{/* {prompt === 'show' && (
				<Modal isOpen={true} onRequestClose={closeModal}>
					<Zoom>
						<div>
							<span>You will lose all cart items if you logout now!</span>
							<button className='button-modal' onClick={closeModal}>
								Continue shopping
							</button>
							<button className='button-modal' onClick={logout}>
								Exit
							</button>
						</div>
					</Zoom>
				</Modal>
			)} */}

			<Filter />
			<Cart />
			<Products />
		</div>
	);
};

Home.propTypes = {
	loadUser: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
};

export default connect(null, { loadUser, logout })(Home);
