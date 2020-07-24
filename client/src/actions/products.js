import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, PRODUCTS_ERROR } from '../types';
import axios from 'axios';

export const fetchProducts = () => async dispatch => {
	try {
		const res = await axios.get('/api/products');

		dispatch({
			type: FETCH_PRODUCTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCTS_ERROR,
		});
	}
};

export const sortProducts = (filteredItems, sort) => dispatch => {
	const sortedProducts = filteredItems.slice();

	if (sort === 'latest') {
		sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
	} else {
		sortedProducts.sort((a, b) =>
			sort === 'lowest' ? (a.price > b.price ? 1 : -1) : a.price > b.price ? -1 : 1
		);
	}

	dispatch({
		type: ORDER_PRODUCTS_BY_PRICE,
		payload: {
			sort: sort,
			items: sortedProducts,
		},
	});
};
