import {
	FETCH_PRODUCTS,
	ORDER_PRODUCTS_BY_PRICE,
	PRODUCTS_ERROR,
	ORDER_BY_CATEGORY,
} from '../types';
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
export const sortCategory = (products, selectedCategory) => dispatch => {
	dispatch({
		type: ORDER_BY_CATEGORY,
		payload: {
			selectedCategory: selectedCategory,
			items:
				selectedCategory === ''
					? products
					: products.filter(item => item.category === selectedCategory),
		},
	});
};

export const sortProducts = (filteredItems, sort) => dispatch => {
	const sortedProducts = filteredItems.slice();

	if (sort === 'latest') {
		sortedProducts.sort((itemA, itemB) => (itemA._id > itemB._id ? 1 : -1));
	} else {
		sortedProducts.sort((itemA, itemB) =>
			sort === 'lowest' ? (itemA.price > itemB.price ? 1 : -1) : itemA.price > itemB.price ? -1 : 1
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
