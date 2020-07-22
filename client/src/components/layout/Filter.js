import React from 'react';
import { sortProducts } from '../../actions/products';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Filter = ({ sort, filteredProducts, sortProducts }) => {
	return !filteredProducts ? (
		<div>Loading...</div>
	) : (
		<div className='filter'>
			<div className='filter-result'>{filteredProducts.length} Products</div>
			<div className='filter-sort'>
				Order{' '}
				<select value={sort} onChange={e => sortProducts(filteredProducts, e.target.value)}>
					<option value='latest'>Latest</option>
					<option value='lowest'>Lowest</option>
					<option value='highest'>Highest</option>
				</select>
			</div>
			{/* <div className='filter-size'>
					Filter{' '}
					<select
						value={this.props.size}
						onChange={e => this.props.filterProducts(this.props.products, e.target.value)}>
						<option value=''>ALL</option>
						<option value='XS'>XS</option>
						<option value='S'>S</option>
						<option value='M'>M</option>
						<option value='L'>L</option>
						<option value='XL'>XL</option>
						<option value='XXL'>XXL</option>
					</select>
				</div> */}
		</div>
	);
};

Filter.propTypes = {
	products: PropTypes.array,
	sort: PropTypes.string,
	filteredProducts: PropTypes.array,
};

const mapStateToProps = state => ({
	products: state.products.items,
	sort: state.products.sort,
	filteredProducts: state.products.filteredItems,
});

export default connect(mapStateToProps, {
	sortProducts,
})(Filter);
