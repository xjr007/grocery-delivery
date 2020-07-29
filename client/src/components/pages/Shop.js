import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { sortProducts, sortCategory } from '../../actions/products';
import { loadUser } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Products from '../layout/Products';
import Filter from '../layout/Filter';

const Shop = ({

	loadUser,
}) => {
	useEffect(() => {
		loadUser();
		//eslint-disable-next-line
	}, [loadUser]);

	return (
		<div>
			<Filter />
			<Products />
		</div>
	);
};


export default connect(null, {
	loadUser,
})(Shop);
