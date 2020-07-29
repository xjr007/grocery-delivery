import {
	CREATE_ORDER,
	FETCH_ORDERS,
	ORDER_ERROR,
	DELETE_ORDER,
	CLEAR_ORDER,
	SET_ORDER,
} from '../types';
import axios from 'axios';
import { loadUser } from './auth';

export const fetchOrders = () => async dispatch => {
	try {
		const res = await axios.get('/api/orders');
		dispatch({ type: FETCH_ORDERS, payload: res.data });
	} catch (err) {
		dispatch({ type: ORDER_ERROR, payload: err.response.data.msg });
	}
	loadUser();
};

export const createOrder = order => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/orders', order, config);
		dispatch({ type: CREATE_ORDER, payload: res.data });
	} catch (err) {
		dispatch({ type: ORDER_ERROR, payload: err.response.data.msg });
	}
};

export const deleteOrder = id => async dispatch => {
	try {
		await axios.delete(`/api/orders/${id}`);
		dispatch({
			type: DELETE_ORDER,
			payload: id,
		});
	} catch (err) {
		dispatch({
			type: ORDER_ERROR,
			payload: err.response.data.msg,
		});
	}
};

export const setOrder = order => dispatch => {
	dispatch({ type: SET_ORDER, payload: order });
};

//Clear Current Contact
export const clearCurrent = () => dispatch => {
	dispatch({ type: CLEAR_ORDER });
};
