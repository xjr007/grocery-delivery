import axios from 'axios';
import { setAuthToken } from '../util';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types';

export const loadUser = () => async dispatch => {
	// const token = localStorage.getItem('token')
	//Remember to change it in reducer

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({ type: USER_LOADED, payload: res.data });
	} catch (err) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const register = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/users', formData, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		loadUser();
	} catch (err) {
		dispatch({
			type: REGISTER_FAIL,
			payload: err.response.data.msg,
		});
	}
};

export const login = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/auth', formData, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		loadUser();
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
			payload: err.response.data.msg,
		});
	}
};

export const logout = () => dispatch => dispatch({ type: LOGOUT });

export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERRORS });
