import React from 'react';
import store from '../../store';
import Products from '../Products';
import { Provider } from 'react-redux';

const Store = () => {
	return (
		<Provider store={store}>
			<Products />
		</Provider>
	);
};

export default Store;
