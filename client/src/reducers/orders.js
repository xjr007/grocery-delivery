import {
	FETCH_ORDERS,
	CREATE_ORDER,
	ORDER_ERROR,
	DELETE_ORDER,
	SET_ORDER,
	CLEAR_ORDER,
} from '../types';

export const orders = (state = { orders: [], current: null, error: null }, action) => {
	switch (action.type) {
		case FETCH_ORDERS:
			return {
				...state,
				orders: action.payload.reverse(),
				loading: false,
			};
		case DELETE_ORDER:
			return {
				...state,
				orders: state.orders.filter(order => order._id !== action.payload),
				loading: false,
			};
		case ORDER_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case SET_ORDER:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_ORDER:
			return {
				...state,
				current: null,
				orders: null,
				error: null,
			};
		case CREATE_ORDER:
			return {
				...state,
				order: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default orders;
