export const formatCurrency = num => {
	return 'R' + Number(num.toFixed(1)).toLocaleString() + ' ';
};

export default formatCurrency;
