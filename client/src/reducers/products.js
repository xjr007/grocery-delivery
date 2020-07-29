import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, ORDER_BY_CATEGORY } from '../types';

export const products = (
	state = {
		filteredItems: null,
		sort: null,
		items: null,
		selectedCategory: null,
	},
	action
) => {
	switch (action.type) {
		case ORDER_PRODUCTS_BY_PRICE:
			return {
				...state,
				sort: action.payload.sort,
				filteredItems: action.payload.items,
			};
		case FETCH_PRODUCTS:
			return {
				items: action.payload,
				filteredItems: action.payload,
			};
		case ORDER_BY_CATEGORY:
			return {
				...state,
				selectedCategory: action.payload.selectedCategory,
				filteredItems: action.payload.items,
			};
		default:
			return state;
	}
};

export default products;
