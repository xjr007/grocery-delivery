import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { searchProducts } from '../../actions/products';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Searchbar = ({ searchProducts, products, searchedProduct }) => {
	const onSearch = e => {
		const searchedProduct = React.createRef();
		e.preventDefault();
		try {
			if (searchedProduct.current.value !== '') {
				searchProducts(products, e.target.value);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='container d-flex justify-content-center m-3'>
			<Form inline>
				<FormControl
					type='text'
					onChange={onSearch}
					placeholder='Search'
					className='mr-sm-2'
					ref={searchedProduct}
				/>
			</Form>
		</div>
	);
};

Searchbar.propTypes = {
	products: PropTypes.array,
	searchedProduct: PropTypes.string,
};

const mapStateToProps = state => ({
	products: state.products.items,
});
export default connect(mapStateToProps, {
	searchProducts,
})(Searchbar);
