import {
	FETCH_ORDERS,
	CREATE_ORDER,
	ORDER_ERROR,
	UPDATE_ORDER,
	DELETE_ORDER,
	SET_ORDER,
	CLEAR_ORDER,
} from '../types';

export const orders = (
	state = {
		orders: null,
		error: null,
		current: null,
	},
	action
) => {
	switch (action.type) {
		case FETCH_ORDERS:
			return {
				...state,
				orders: action.payload,
				loading: false,
			};
		case UPDATE_ORDER:
			return {
				...state,
				orders: state.orders.map(order => (order._id === action.payload._id ? action.payload : order)),
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
			};
		default:
			return state;
	}
};

export default orders;
