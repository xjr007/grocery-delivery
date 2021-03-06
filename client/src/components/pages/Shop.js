import React, { useEffect } from 'react';
import { loadUser } from '../../actions/auth';
import { connect } from 'react-redux';
import Products from '../layout/Products';
import Filter from '../layout/Filter';
import Cart from '../layout/Cart';
import Searchbar from '../layout/Searchbar';

const Shop = ({ loadUser }) => {
	useEffect(() => {
		loadUser();
		window.scrollTo(0, 0);
		//eslint-disable-next-line
	}, [loadUser]);

	return (
		<div>
			<div className='search-filter'>
				<Searchbar />
				<Filter />
			</div>
			<div className='container fluid shop mt-5'>
				<div className=' d-flex flex-row'></div>

				<Products />
			</div>
		</div>
	);
};

export default connect(null, {
	loadUser,
})(Shop);
