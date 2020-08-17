import React, { useEffect } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { searchProducts } from '../../actions/products';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Searchbar = ({ searchProducts, products, searchedProduct }) => {
	const currSearchFor = React.createRef();

	useEffect(() => {
		if (products == null) {
			currSearchFor.current.value = null;
		}
	});

	const onSearch = e => {
		e.preventDefault();
		try {
			if (currSearchFor.current.value !== '') {
				searchProducts(products, e.target.value);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='d-flex ml-auto mr-auto mt-3'>
			<Form inline>
				<FormControl
					type='text'
					onChange={onSearch}
					placeholder='Search'
					className='mr-sm-2'
					ref={currSearchFor}
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
	searchedProduct: state.products.searchedProduct,
});
export default connect(mapStateToProps, {
	searchProducts,
})(Searchbar);
