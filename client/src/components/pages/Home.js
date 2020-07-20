import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import ProductStore from './productStore';

const Home = () => {
	const authContext = useContext(AuthContext);
	useEffect(() => {
		authContext.loadUser();
		// eslint-disable-next-line
	}, []);
	return (
		<Fragment className='grid-2'>
			<ProductStore />
		</Fragment>
	);
};

export default Home;
