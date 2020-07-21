import React, { useEffect } from 'react';
import { loadUser } from '../../actions/auth';
import { connect } from 'react-redux';
import Filter from '../Filter';
import Products from '../Products';

const Home = ({ loadUser }) => {
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);
	return (
		<div className='grid-2'>
			<Filter />
			<Products />
		</div>
	);
};

export default connect({ loadUser })(Home);
