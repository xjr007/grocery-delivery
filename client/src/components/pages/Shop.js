import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { sortProducts } from '../../actions/products';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Products from '../layout/Products';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import Cart from '../layout/Cart';

const Shop = ({ sort, filteredProducts, sortProducts }) => {
	const onChange = e => {
		e.preventDefault();
		sortProducts(filteredProducts, e.target.value);
	};
	return !filteredProducts ? (
		<div>Loading...</div>
	) : (
		<div>
			<Form>
				<Form.Row>
					<Col>
						<Form.Group controlId='Form.ControlSort my-2'>
							<Form.Control size='sm' as='select' value={sort} onChange={onChange}>
								<option>Sort Price</option>
								<option value='latest'>Price (latest)</option>
								<option value='lowest'>Price (low to high)</option>
								<option value='highest'>Price (high to low)</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Cart />
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<Products className='mt-2' />
		</div>
	);
};

Shop.propTypes = {
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
})(Shop);
