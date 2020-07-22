import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const cartPreview = () => {
	return (
		<div>
			<h1>Preview Cart</h1>
		</div>
	);
};

cartPreview.propTypes = {
	prop: PropTypes,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(cartPreview);
