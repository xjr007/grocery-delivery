import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { sortProducts } from '../../actions/products';
import { loadUser } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Products from '../layout/Products';
import Cart from '../layout/Cart';

const Shop = ({
	auth: { isAuthenticated, loading },
	sort,
	filteredProducts,
	sortProducts,
	loadUser,
}) => {
	useEffect(() => {
		loadUser();
		//eslint-disable-next-line
	}, [loadUser]);

	const onChange = e => {
		e.preventDefault();
		try {
			sortProducts(filteredProducts, e.target.value);
		} catch (err) {
			console.log(err);
		}
	};
	return !filteredProducts && !isAuthenticated && !loading ? (
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
	auth: PropTypes.object.isRequired,
	products: PropTypes.array,
	sort: PropTypes.string,
	filteredProducts: PropTypes.array,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	products: state.products.items,
	sort: state.products.sort,
	filteredProducts: state.products.filteredItems,
});

export default connect(mapStateToProps, {
	sortProducts,
	loadUser,
})(Shop);
