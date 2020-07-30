import React, { useEffect } from 'react';
import { loadUser } from '../../actions/auth';
import { connect } from 'react-redux';
import Products from '../layout/Products';
import Filter from '../layout/Filter';
import Cart from '../layout/Cart';

const Shop = ({ loadUser }) => {
	useEffect(() => {
		loadUser();
		window.scrollTo(0, 0);
		//eslint-disable-next-line
	}, [loadUser]);

	return (
		<div className='container fluid shop mt-5'>
			<div className=' d-flex flex-row'>
				<div className='mr-auto'>
					<Filter />
				</div>
				<div className='ml-auto'>
					<Cart />
				</div>
			</div>

			<Products />
		</div>
	);
};

export default connect(null, {
	loadUser,
})(Shop);
