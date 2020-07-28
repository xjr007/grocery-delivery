import axios from 'axios';

export const formatCurrency = num => {
	let currencyZAR = null;
	try {
		currencyZAR = Number(num.toFixed(1)).toLocaleString() + ' ';
		return 'R' + currencyZAR;
	} catch (err) {
		console.log(err);
	}
};

export const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};
