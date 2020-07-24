import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createOrder } from '../../actions/orders';

export const CreateDelivery = ({ createOrder }) => {
	return (
		<div>
			<h1>Create Order</h1>
		</div>
	);
};

CreateDelivery.propTypes = {
	prop: PropTypes,
};

const mapStateToProps = state => ({
	createOrder: PropTypes.func.isRequired,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { createOrder })(CreateDelivery);
