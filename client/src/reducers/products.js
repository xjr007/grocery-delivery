import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, SET_LOADING, PRODUCTS_ERROR } from '../types';

const initialState = {
	items: null,
	current: null,
	loading: false,
	error: null,
	sort: null,
	filteredItems: null,
};
export const products = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return {
				...state,
				items: action.payload,
				loading: false,
				filteredItems: action.payload,
			};
		case ORDER_PRODUCTS_BY_PRICE:
			return {
				...state,
				sort: action.payload.sort,
				loading: false,
				filteredItems: action.payload.items,
			};
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};
		case PRODUCTS_ERROR:
			console.error(action.payload);
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default products;
