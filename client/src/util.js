import axios from 'axios';

export const formatCurrency = num => {
	return 'R' + Number(num.toFixed(1)).toLocaleString() + ' ';
};

export const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};
