import React, { useEffect } from 'react';
import Products from '../layout/Products';
import Filter from '../layout/Filter';

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
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

export default Home;
