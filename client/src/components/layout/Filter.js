import React from 'react';
import { sortProducts, sortCategory } from '../../actions/products';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const Filter = ({ sort, category, filteredProducts, products, sortProducts, sortCategory }) => {
	const getAllProducts = '';
	const onSort = e => {
		e.preventDefault();
		try {
			sortProducts(filteredProducts, e.target.value);
		} catch (err) {
			console.log(err);
		}
	};

	const onCategory = e => {
		e.preventDefault();
		try {
			if (e.target.value !== '') {
				sortCategory(products, e.target.value);
			} else {
				sortCategory(products, getAllProducts);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Form className='mt-3'>
			Filter
			<Form.Row className='m-3'>
				<Col>
					<Form.Group controlId='Form.ControlSort my-2'>
						<Form.Control size='sm' as='select' value={sort} onChange={onSort}>
							<option value='latest'>Price (latest)</option>
							<option value='lowest'>Price (low to high)</option>
							<option value='highest'>Price (high to low)</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='Form.ControlCat my-2'>
						<Form.Control
							size='sm'
							as='select'
							value={category}
							onChange={onCategory}
							title='Sort Category'>
							<option value=''>Category</option>
							<option value='Clothing'>Clothing</option>
							<option value='Sports'>Sports</option>
							<option value='Electronics'>Electronics</option>
						</Form.Control>
					</Form.Group>
				</Col>
			</Form.Row>
		</Form>
	);
};

Filter.propTypes = {
	products: PropTypes.array,
	sort: PropTypes.string,
	category: PropTypes.string,
	filteredProducts: PropTypes.array,
};

const mapStateToProps = state => ({
	sort: state.products.sort,
	category: state.products.selectedCategory,
	products: state.products.items,
	filteredProducts: state.products.filteredItems,
});

export default connect(mapStateToProps, {
	sortProducts,
	sortCategory,
})(Filter);
